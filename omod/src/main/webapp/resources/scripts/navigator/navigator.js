/**
 * Navigator
 *
 * Given HTML in a specific format, the Navigator transforms the the HTML into a keyboard-friendly,
 * one-question-per-screen format, with a left-hand navigation bar
 *
 * The form is broken up as follows:
 *
 * Sections: the form is broken up into sections, designated by the <section> tag
 *
 * Questions: within each section, the form is broken up into questions, with each question designated by the <fieldset> tag
 *
 * Fields: within each question, the broken into fields, a field being designed by either:
 *          1) a <p> tag containing a input, textarea, select, or button
 *          2) a <field> tag
 *
 * An example of an form that uses tha Navigator can be found here:
 *
 * https://github.com/openmrs/openmrs-module-registrationapp/blob/master/omod/src/main/webapp/pages/registerPatient.gsp#L153
 */


// TODO we may want to remove this global variable as some point; not sure if it is still used in ref app somewhere
var Navigator = {isReady: false}


// TODO figure out out to set up mocking to test this
// TODO this really isn't just the "keyboard controller" anymore as it adds buttons and supports mouse clickers
function KeyboardController(formElement) {

    if (!formElement) {
      formElement = $('div#content > form').first();
    }

    var initFormModels = function(formElement) {

        formElement.prepend('<ul id="formBreadcrumb" class="options"></ul>');
        formElement.append(
          '<div id="nav-buttons">'
          + '<button id="prev-button" type="button" class="confirm" style="display:none">'
          + '  <icon class="fas fa-chevron-left"/>'
          + '</button>'
          + '<button id="next-button" class="confirm right" type="button">'
          + '  <icon class="fas fa-chevron-right"/>'
          + '</button>'
          + '</div>');

        var breadcrumb = formElement.find('#formBreadcrumb').first();
        var navButtons = formElement.find('#nav-buttons').first();

        var sections = _.map(formElement.find('section'), function(s) {
            return new SectionModel(s, breadcrumb);
        });

        var confirmationSection = new ConfirmationSectionModel(
          $('#confirmation'),
          breadcrumb, _.clone(sections),
          formElement.hasClass('skip-confirmation-section'),
          navButtons);
        sections.push(confirmationSection);

        var questions = _.flatten( _.map(sections, function(s) { return s.questions; }), true);
        var fields = _.flatten(_.map(questions, function(q) { return q.fields; }), true);
        return [sections, questions, fields];

    };

    var modelsList = initFormModels(formElement);

    var sections=modelsList[0], questions=modelsList[1], fields=modelsList[2];
    var prevButton = formElement.find('#prev-button').first();

    sectionsMouseHandlerInitializer(sections);
    questionsMouseHandlerInitializer(questions);
    fieldsMouseHandlerInitializer(fields);

    var questionsHandler = QuestionsHandler(questions, prevButton);
    var fieldsHandler = FieldsKeyboardHandler(fields, questionsHandler);

    fieldsHandler.handleTabKey();

    $('body').keydown(function(key) {
        switch(key.keyCode ? key.keyCode : key.which) {
            case 38:
                fieldsHandler.handleUpKey() && key.preventDefault();
                break;
            case 40:
                fieldsHandler.handleDownKey() && key.preventDefault();
                break;
            case 27:
                fieldsHandler.handleEscKey() && key.preventDefault();
                break;
            case 9:
                if(key.shiftKey) {
                    fieldsHandler.handleShiftTabKey();
                } else {
                    fieldsHandler.handleTabKey();
                }
                key.preventDefault();
                break;
            case 13:
                fieldsHandler.handleEnterKey() && key.preventDefault();
            default:
                break;
        }
    });

    $('#prev-button').click(function() {
      questionsHandler.prevQuestion();
    });

    $('#next-button').click(function() {
      questionsHandler.nextQuestion();
    });

    // TODO we may want to remove this global variable as some point; not sure if it is still used in ref app somewhere
    Navigator.isReady = true;

    var api = {};

    // searches by the id of the widget, e.g. <p><label>...</label><input id="search-for-me"/></p>
    api.getFieldById = function(id) {
        return _.find(fields, function(element) {
            return element.id == id;
        })
    }

    // searches by the id of the <p> around the widget, e.g. <p id="search-for-me"><label>...</label><input/></p>
    api.getFieldByContainerId = function(id) {
        return _.find(fields, function(element) {
            return element.container.attr('id') == id;
        })
    }

    api.getQuestionById = function(id) {
        return _.find(questions, function(element) {
            return element.id == id;
        })
    }

    api.getSectionById = function(id) {
        return _.find(sections, function(element) {
            return element.id == id;
        })
    }

    api.getSections = function() {
        return sections;
    }

    api.getQuestions = function() {
        return questions;
    }

    api.getFields = function() {
        return fields;
    }

    // in an Html Form the Keyboard Controller is exposed as a "NavigatorController" global variable,
    // so, for instance, we can access these API methods via NavigatorController.stepBackward();

    // used to automatically step back and forward throughout the form; note that this just triggers the
    // appropriate underlying key, so therefore all required validation must pass before it it allowed to step forward
    api.stepBackward = function() {
        fieldsHandler.handleShiftTabKey();
    }

    api.stepForward = function() {
        fieldsHandler.handleTabKey();
    }


    return api;
}
