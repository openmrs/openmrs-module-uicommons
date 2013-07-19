function initFormModels(formEl) {
    var formElement = formEl;
    if (!formElement) {
        formElement = $('div#content > form').first();
    }
    formElement.prepend('<ul id="formBreadcrumb" class="options"></ul>');
    var breadcrumb = formElement.find('#formBreadcrumb').first();

    var sections = _.map(formElement.find('section'), function(s) {
        return new SectionModel(s, breadcrumb);
    });

    var confirmationSection = new ConfirmationSectionModel($('#confirmation'), breadcrumb, _.clone(sections));
    sections.push(confirmationSection);

    var questions = _.flatten( _.map(sections, function(s) { return s.questions; }), true);
    var fields = _.flatten(_.map(questions, function(q) { return q.fields; }), true);
    return [sections, questions, fields];
}

function initKeyboardHandlersChain(questions, fields) {
    var questionsHandler = QuestionsKeyboardHandler(questions);
    var fieldsHandler = FieldsKeyboardHandler(fields, questionsHandler);
    return fieldsHandler;
}

function initMouseHandlers(sections, questions, fields) {
    sectionsMouseHandlerInitializer(sections);
    questionsMouseHandlerInitializer(questions);
    fieldsMouseHandlerInitializer(fields);
}

function KeyboardController(formElement) {
    var modelsList = initFormModels(formElement);
    var sections=modelsList[0], questions=modelsList[1], fields=modelsList[2];
    initMouseHandlers(sections, questions, fields);
    var handlerChainRoot = initKeyboardHandlersChain(questions, fields);

    handlerChainRoot.handleTabKey();

    $('body').keydown(function(key) {
        switch(key.keyCode ? key.keyCode : key.which) {
            case 38:
                handlerChainRoot.handleUpKey() && key.preventDefault();
                break;
            case 40:
                handlerChainRoot.handleDownKey() && key.preventDefault();
                break;
            case 27:
                handlerChainRoot.handleEscKey() && key.preventDefault();
                break;
            case 9:
                if(event.shiftKey) {
                    handlerChainRoot.handleShiftTabKey();
                } else {
                    handlerChainRoot.handleTabKey();
                }
                key.preventDefault();
                break;
            case 13:
                handlerChainRoot.handleEnterKey();
                key.preventDefault();
            default:
                break;
        }
    });
}