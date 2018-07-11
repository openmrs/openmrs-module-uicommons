
describe("Test for simple form models", function() {

    // override feature toggling so that every feature is on
    beforeEach(function() {
        emr.isFeatureEnabled= function() {
            return true;
        }
    });

    describe("Unit tests for FieldModel", function() {

        it("should select and unselect the field", function() {
            var fieldModel = new FieldModel();
            fieldModel.element = jasmine.createSpyObj('element', ['focus', 'blur', 'addClass', 'removeClass', 'triggerHandler']);

            fieldModel.toggleSelection();
            expect(fieldModel.element.focus).toHaveBeenCalled();
            expect(fieldModel.element.addClass).toHaveBeenCalledWith("focused");
            expect(fieldModel.isSelected).toBe(true);

            fieldModel.toggleSelection();
            expect(fieldModel.element.blur).toHaveBeenCalled();
            expect(fieldModel.element.removeClass).toHaveBeenCalledWith("error");
            expect(fieldModel.element.removeClass).toHaveBeenCalledWith("focused");
            expect(fieldModel.isSelected).toBe(false);
        });

        it("should state the field is valid", function() {
            var firstValidator = jasmine.createSpyObj('firstValidator', ['validate']);
            var secondValidator = jasmine.createSpyObj('secondValidator', ['validate']);
            firstValidator.validate.andReturn(null);
            secondValidator.validate.andReturn(null);

            var fieldModel = new FieldModel();
            fieldModel.messagesContainer = jasmine.createSpyObj('messagesContainer', ['empty']);
            fieldModel.validators = [firstValidator, secondValidator];

            var isValid = fieldModel.isValid();

            expect(firstValidator.validate).toHaveBeenCalledWith(fieldModel);
            expect(secondValidator.validate).toHaveBeenCalledWith(fieldModel);
            expect(fieldModel.messagesContainer.empty).toHaveBeenCalled();
            expect(isValid).toBe(true);
        });

        it("should state the field is invalid", function() {
            var firstValidator = jasmine.createSpyObj('firstValidator', ['validate']);
            var secondValidator = jasmine.createSpyObj('secondValidator', ['validate']);
            firstValidator.validate.andReturn('Invalid field');
            secondValidator.validate.andReturn(null);

            var fieldModel = new FieldModel();
            fieldModel.isDisabled = function() { return false; }
            fieldModel.element = jasmine.createSpyObj('element', ['addClass']);
            fieldModel.messagesContainer = jasmine.createSpyObj('messagesContainer', ['empty', 'append', 'show']);
            fieldModel.validators = [firstValidator, secondValidator];

            var isValid = fieldModel.isValid();

            expect(firstValidator.validate).toHaveBeenCalledWith(fieldModel);
            expect(secondValidator.validate).toHaveBeenCalledWith(fieldModel);
            expect(fieldModel.messagesContainer.empty).toHaveBeenCalled();
            expect(fieldModel.messagesContainer.append).toHaveBeenCalledWith("Invalid field");
            expect(fieldModel.messagesContainer.show).toHaveBeenCalled();
            expect(fieldModel.element.addClass).toHaveBeenCalledWith("error");
            expect(isValid).toBe(false);
        });

        it("should call all exit handlers and return true", function() {
            var firstExitHandler = jasmine.createSpyObj('firstExitHandler', ['handleExit']);
            var secondExitHandler = jasmine.createSpyObj('secondExitHandler', ['handleExit']);
            firstExitHandler.handleExit.andReturn(true);
            secondExitHandler.handleExit.andReturn(true);

            var fieldModel = new FieldModel();
            fieldModel.exitHandlers = [firstExitHandler, secondExitHandler];

            var exit = fieldModel.onExit();

            expect(firstExitHandler.handleExit).toHaveBeenCalledWith(fieldModel);
            expect(secondExitHandler.handleExit).toHaveBeenCalledWith(fieldModel);
            expect(exit).toBe(true);
        });

        it("should call all exit handlers and return false if any handler returns false", function() {
            var firstExitHandler = jasmine.createSpyObj('firstExitHandler', ['handleExit']);
            var secondExitHandler = jasmine.createSpyObj('secondExitHandler', ['handleExit']);
            firstExitHandler.handleExit.andReturn(true);
            secondExitHandler.handleExit.andReturn(false);

            var fieldModel = new FieldModel();
            fieldModel.exitHandlers = [firstExitHandler, secondExitHandler];

            var exit = fieldModel.onExit();

            expect(firstExitHandler.handleExit).toHaveBeenCalledWith(fieldModel);
            expect(secondExitHandler.handleExit).toHaveBeenCalledWith(fieldModel);
            expect(exit).toBe(false);
        });

        it("should disable a field", function() {
            var fieldModel = new FieldModel();
            var element = jasmine.createSpyObj('element', ['attr', 'addClass', 'triggerHandler' ]);
            fieldModel.element = element;
            var container = jasmine.createSpyObj('container', ['addClass']);
            fieldModel.container = container;
            spyOn(fieldModel, "resetValue");

            fieldModel.disable();
            expect(element.attr).toHaveBeenCalledWith('disabled', 'true');
            expect(element.addClass).toHaveBeenCalledWith('disabled');
            expect(container.addClass).toHaveBeenCalledWith('disabled');
            expect(fieldModel.resetValue).toHaveBeenCalled();
        })

        it("should enable a field", function() {
            var fieldModel = new FieldModel();
            var element = jasmine.createSpyObj('element', ['removeAttr', 'removeClass', 'triggerHandler' ]);
            fieldModel.element = element;
            var container = jasmine.createSpyObj('container', ['removeClass']);
            fieldModel.container = container;

            fieldModel.enable();
            expect(element.removeAttr).toHaveBeenCalledWith('disabled');
            expect(element.removeClass).toHaveBeenCalledWith('disabled');
            expect(container.removeClass).toHaveBeenCalledWith('disabled');
        })

        it("should hide a field", function() {
            var fieldModel = new FieldModel();
            var element = jasmine.createSpyObj('element', ['attr', 'addClass', 'hide', 'triggerHandler' ]);
            fieldModel.element = element;
            var container = jasmine.createSpyObj('container', ['hide']);
            fieldModel.container = container;
            spyOn(fieldModel, 'disable');

            fieldModel.hide();
            expect(fieldModel.disable).toHaveBeenCalled();
            expect(container.hide).toHaveBeenCalled();
        })

        it("should show a field", function() {
            var fieldModel = new FieldModel();
            var element = jasmine.createSpyObj('element', ['removeAttr', 'removeClass', 'triggerHandler', 'show', 'addClass', 'focus']);
            fieldModel.element = element;
            var container = jasmine.createSpyObj('container', ['show']);
            fieldModel.container = container;
            fieldModel.isSelected = true;
            spyOn(fieldModel, 'enable');
            spyOn(fieldModel, 'select');

            fieldModel.show();
            expect(fieldModel.enable).toHaveBeenCalled();
            expect(fieldModel.select).toHaveBeenCalled();
            expect(container.show).toHaveBeenCalled();
        })

        it("should show a field but not select it", function() {
            var fieldModel = new FieldModel();
            var element = jasmine.createSpyObj('element', ['removeAttr', 'removeClass', 'triggerHandler', 'show' ]);
            fieldModel.element = element;
            var container = jasmine.createSpyObj('container', ['show']);
            fieldModel.container = container;
            fieldModel.isSelected = false;
            spyOn(fieldModel, 'enable');
            spyOn(fieldModel, 'select');

            fieldModel.show();
            expect(fieldModel.enable).toHaveBeenCalled();
            expect(fieldModel.select).not.toHaveBeenCalled();
            expect(container.show).toHaveBeenCalled();
        })

        it("should reset the value of field", function() {
            var fieldModel = new FieldModel();
            var element = jasmine.createSpyObj('element', ['removeAttr', 'removeClass', 'show', 'attr','is', 'find', 'val' ]);
            fieldModel.element = element;
            element.find = jasmine.createSpy('find() spy').andReturn([]);

            fieldModel.resetValue();
            expect(element.val).toHaveBeenCalledWith("");
        })

        it("should reset the value of dropdown field", function() {
            var fieldModel = new FieldModel();
            var element = jasmine.createSpyObj('element', ['removeAttr', 'removeClass', 'show', 'attr','is', 'find', 'val' ]);
            fieldModel.element = element;

            var selectedOption = jasmine.createSpyObj('selectedOption', ['removeAttr', 'length']);
            selectedOption.length = 1;
            element.find = jasmine.createSpy('find() spy').andReturn(selectedOption);

            fieldModel.resetValue();
            expect(element.find).toHaveBeenCalledWith("option:selected");
            expect(selectedOption.removeAttr).toHaveBeenCalledWith("selected");
        })

        it("should reset the value of radio set field", function() {
            var fieldModel = new FieldModel();
            var element = jasmine.createSpyObj('element', ['removeAttr', 'removeClass', 'show', 'attr','is', 'find', 'val' ]);
            fieldModel.element = element;
            element.find = jasmine.createSpy('find() spy').andReturn([]);
            element.attr = jasmine.createSpy('attr() spy').andReturn('radio');
            element.is = jasmine.createSpy('is() spy').andReturn(true);

            fieldModel.resetValue();
            expect(element.removeAttr).toHaveBeenCalledWith("checked");
        })

    });

    describe("Unit tests for QuestionModel", function() {

        var questionModel;
        var firstField;
        var secondField;
        var element;

        beforeEach(function() {
            questionModel = new QuestionModel();
            firstField = jasmine.createSpyObj('firstField', ['unselect', 'resetErrorMessages', 'value', 'displayValue', 'enable', 'disable', 'hide', 'show']);
            secondField = jasmine.createSpyObj('secondField', ['unselect', 'resetErrorMessages', 'value', 'displayValue', 'enable', 'disable', 'hide', 'show']);
            firstField.element = jasmine.createSpyObj('element', ['addClass', 'removeClass', 'hasClass']);
            secondField.element  = jasmine.createSpyObj('element', ['addClass', 'removeClass', 'hasClass']);
            questionModel.fields = [firstField, secondField];
            element = jasmine.createSpyObj('element', ['addClass', 'removeClass', 'triggerHandler', 'attr', 'removeAttr', 'hide', 'show']);
            questionModel.element = element;
            spyOn(questionModel.questionLi, 'addClass');
            spyOn(questionModel.questionLi, 'removeClass');
            spyOn(questionModel.questionLi, 'show');
            spyOn(questionModel.questionLi, 'hide');
        });


        it("should select and unselect the question", function() {
            questionModel.toggleSelection();
            expect(questionModel.element.addClass).toHaveBeenCalledWith("focused");
            expect(questionModel.questionLi.addClass).toHaveBeenCalledWith("focused");
            expect(firstField.resetErrorMessages).toHaveBeenCalled();
            expect(secondField.resetErrorMessages).toHaveBeenCalled();
            expect(questionModel.isSelected).toBe(true);

            questionModel.toggleSelection();
            expect(questionModel.element.removeClass).toHaveBeenCalledWith("focused");
            expect(questionModel.questionLi.removeClass).toHaveBeenCalledWith("focused");
            expect(questionModel.isSelected).toBe(false);
            expect(firstField.unselect).toHaveBeenCalled();
            expect(secondField.unselect).toHaveBeenCalled();
        });

        it("should mark question has done if first field has value", function() {
            firstField.displayValue.andReturn("1");
            secondField.displayValue.andReturn("");

            // select the question
            questionModel.toggleSelection();

            // unselect the question
            questionModel.toggleSelection();
            expect(questionModel.questionLi.addClass).toHaveBeenCalledWith("done");
        });

        it("should mark question has done if second field has value", function() {
            firstField.displayValue.andReturn("");
            secondField.displayValue.andReturn("1");

            // select the question
            questionModel.toggleSelection();

            // unselect the question
            questionModel.toggleSelection();
            expect(questionModel.questionLi.addClass).toHaveBeenCalledWith("done");
        });

        it("should mark question has done if both fields have value", function() {
            firstField.displayValue.andReturn("1");
            secondField.displayValue.andReturn("1");

            // select the question
            questionModel.toggleSelection();

            // unselect the question
            questionModel.toggleSelection();
            expect(questionModel.questionLi.addClass).toHaveBeenCalledWith("done");
        });

        it("should not mark question has done if neither fields have value", function() {
            firstField.displayValue.andReturn("");
            secondField.displayValue.andReturn("");
            questionModel.fields = [firstField, secondField];

            // select the question
            questionModel.toggleSelection();

            // unselect the question
            questionModel.toggleSelection();
            expect(questionModel.questionLi.removeClass).toHaveBeenCalledWith("done");
        });

        it("should not mark question as done if expected field does not have value", function() {
            firstField.displayValue.andReturn("1");
            secondField.element.hasClass.andReturn('true');
            secondField.displayValue.andReturn("");

            // select the question
            questionModel.toggleSelection();

            // unselect the question
            questionModel.toggleSelection();
            expect(secondField.element.hasClass).toHaveBeenCalledWith('expected');
            expect(questionModel.questionLi.removeClass).toHaveBeenCalledWith('done');
        });

        it("should mark question as done if expected field has value", function() {
            firstField.displayValue.andReturn("");
            secondField.element.hasClass.andReturn('true');
            secondField.displayValue.andReturn("1");

            // select the question
            questionModel.toggleSelection();

            // unselect the question
            questionModel.toggleSelection();
            expect(secondField.element.hasClass).toHaveBeenCalledWith('expected');
            expect(questionModel.questionLi.addClass).toHaveBeenCalledWith("done");
        });

        it("should disable a question", function() {
            questionModel.disable();

            expect(firstField.disable).toHaveBeenCalled();
            expect(secondField.disable).toHaveBeenCalled();
            expect(element.attr).toHaveBeenCalledWith('disabled', 'true');
            expect(element.addClass).toHaveBeenCalledWith('disabled');
        });

        it("should enable a question", function() {
            questionModel.enable();

            expect(firstField.enable).toHaveBeenCalled();
            expect(secondField.enable).toHaveBeenCalled();
            expect(element.removeAttr).toHaveBeenCalledWith('disabled');
            expect(element.removeClass).toHaveBeenCalledWith('disabled');
        });

        it("should hide a question", function() {
            spyOn(questionModel, "disable");
            questionModel.hide();

            expect(firstField.hide).toHaveBeenCalled();
            expect(secondField.hide).toHaveBeenCalled();
            expect(questionModel.questionLi.hide).toHaveBeenCalled();
            expect(questionModel.disable).toHaveBeenCalled();
        })

        it("should show a question", function() {
            spyOn(questionModel, "enable");
            questionModel.show();

            expect(firstField.show).toHaveBeenCalled();
            expect(secondField.show).toHaveBeenCalled();
            expect(questionModel.questionLi.show).toHaveBeenCalled();
            expect(questionModel.enable).toHaveBeenCalled();
        })

        it("should state the question is valid", function() {
            var firstField = jasmine.createSpyObj('firstField', ['isValid']);
            var secondField = jasmine.createSpyObj('firstField', ['isValid']);
            firstField.isValid.andReturn(true);
            secondField.isValid.andReturn(true);

            var questionModel = new QuestionModel();
            questionModel.fields = [firstField, secondField];

            var isValid = questionModel.isValid();

            expect(firstField.isValid).toHaveBeenCalled();
            expect(secondField.isValid).toHaveBeenCalled();
            expect(isValid).toBe(true);
        });

        it("should state the question is invalid", function() {
            var firstField = jasmine.createSpyObj('firstField', ['isValid']);
            var secondField = jasmine.createSpyObj('firstField', ['isValid']);
            firstField.isValid.andReturn(false);
            secondField.isValid.andReturn(true);

            var questionModel = new QuestionModel();
            questionModel.fields = [firstField, secondField];

            var isValid = questionModel.isValid();

            expect(firstField.isValid).toHaveBeenCalled();
            expect(secondField.isValid).toHaveBeenCalled();
            expect(isValid).toBe(false);
        });

        it("should call exit handlers for question and return true if all handlers return true", function() {
            var firstField = jasmine.createSpyObj('firstField', ['onExit']);
            var secondField = jasmine.createSpyObj('firstField', ['onExit']);
            firstField.onExit.andReturn(true);
            secondField.onExit.andReturn(true);

            var questionModel = new QuestionModel();
            questionModel.fields = [firstField, secondField];

            var onExit = questionModel.onExit();

            expect(firstField.onExit).toHaveBeenCalled();
            expect(secondField.onExit).toHaveBeenCalled();
            expect(onExit).toBe(true);
        })

        it("should call exit handlers for question and return false if any handler returns false", function() {
            var firstField = jasmine.createSpyObj('firstField', ['onExit']);
            var secondField = jasmine.createSpyObj('firstField', ['onExit']);
            firstField.onExit.andReturn(true);
            secondField.onExit.andReturn(false);

            var questionModel = new QuestionModel();
            questionModel.fields = [firstField, secondField];

            var onExit = questionModel.onExit();

            expect(firstField.onExit).toHaveBeenCalled();
            expect(secondField.onExit).toHaveBeenCalled();
            expect(onExit).toBe(false);
        })

    });

    describe("Unit tests for SectionModel", function() {

        var sectionModel;

        var menuElement;
        var firstQuestion;
        var secondQuestion;
        var element;


        beforeEach(function() {
            menuElement = jasmine.createSpyObj('menu', ['append']);
            firstQuestion = jasmine.createSpyObj('firstQuestion', ['unselect', 'resetErrorMessages', 'isValid', 'onExit', 'disable', 'enable', 'hide', 'show']);
            secondQuestion = jasmine.createSpyObj('secondQuestion', ['unselect', 'resetErrorMessages', 'isValid', 'onExit', 'disable', 'enable', 'hide', 'show']);
            element = jasmine.createSpyObj('element', ['addClass', 'removeClass', 'hasClass', 'triggerHandler', 'attr', 'removeAttr', 'hide', 'show']);

            sectionModel = new SectionModel(null, menuElement);
            sectionModel.isDisabled = function() { return false; };
            sectionModel.element = element;
            sectionModel.questions = [firstQuestion, secondQuestion];
        })


       it("should select and unselect the section", function() {
           sectionModel.title = jasmine.createSpyObj('title', ['addClass', 'removeClass']);

           sectionModel.toggleSelection();
           expect(sectionModel.title.addClass).toHaveBeenCalledWith('doing');
           expect(sectionModel.element.addClass).toHaveBeenCalledWith('focused');
           expect(sectionModel.isSelected).toBe(true);

           sectionModel.toggleSelection();
           expect(sectionModel.title.removeClass).toHaveBeenCalledWith('doing')
           expect(sectionModel.element.removeClass).toHaveBeenCalledWith('focused');
           expect(firstQuestion.unselect).toHaveBeenCalled();
           expect(secondQuestion.unselect).toHaveBeenCalled();
           expect(sectionModel.isSelected).toBe(false);
       });

        it("should state the section is valid", function() {
            firstQuestion.isValid.andReturn(true);
            secondQuestion.isValid.andReturn(true);

            var isValid = sectionModel.isValid();

            expect(firstQuestion.isValid).toHaveBeenCalled();
            expect(secondQuestion.isValid).toHaveBeenCalled();
            expect(isValid).toBe(true);

        });

        it("should state that a disabled section is valid regardless of questions", function() {
            sectionModel.isDisabled = function() { return true; }

            var isValid = sectionModel.isValid();

            expect(firstQuestion.isValid).not.toHaveBeenCalled();
            expect(secondQuestion.isValid).not.toHaveBeenCalled();
            expect(isValid).toBe(true);
        });

        it("should state the section is not valid", function() {
            firstQuestion.isValid.andReturn(true);
            secondQuestion.isValid.andReturn(false);

            var isValid = sectionModel.isValid();

            expect(firstQuestion.isValid).toHaveBeenCalled();
            expect(secondQuestion.isValid).toHaveBeenCalled();
            expect(isValid).toBe(false);

        });

        it(" should call exit handlers for question and return true if all handlers return true", function() {
            firstQuestion.onExit.andReturn(true);
            secondQuestion.onExit.andReturn(true);

            var onExit = sectionModel.onExit();

            expect(firstQuestion.onExit).toHaveBeenCalled();
            expect(secondQuestion.onExit).toHaveBeenCalled();
            expect(onExit).toBe(true);

        });

        it(" should call exit handlers for question and return false if any handler returns false", function() {
            firstQuestion.onExit.andReturn(true);
            secondQuestion.onExit.andReturn(false);

            var onExit = sectionModel.onExit();

            expect(firstQuestion.onExit).toHaveBeenCalled();
            expect(secondQuestion.onExit).toHaveBeenCalled();
            expect(onExit).toBe(false);

        });

        it("should disable a section", function() {
            sectionModel.disable();

            expect(firstQuestion.disable).toHaveBeenCalled();
            expect(secondQuestion.disable).toHaveBeenCalled();
            expect(element.attr).toHaveBeenCalledWith('disabled', 'true');
            expect(element.addClass).toHaveBeenCalledWith('disabled');
        });

        it("should enable a section", function() {
            sectionModel.enable();

            expect(firstQuestion.enable).toHaveBeenCalled();
            expect(secondQuestion.enable).toHaveBeenCalled();
            expect(element.removeAttr).toHaveBeenCalledWith('disabled');
            expect(element.removeClass).toHaveBeenCalledWith('disabled');
        });


        it("should hide a section", function() {
            spyOn(sectionModel.title, "hide");

            sectionModel.hide();

            expect(firstQuestion.hide).toHaveBeenCalled();
            expect(secondQuestion.hide).toHaveBeenCalled();
            expect(sectionModel.title.hide).toHaveBeenCalled();
        })

        it("should show a section", function() {
            spyOn(sectionModel.title, "show");

            sectionModel.show();

            expect(firstQuestion.show).toHaveBeenCalled();
            expect(secondQuestion.show).toHaveBeenCalled();
            expect(sectionModel.title.show).toHaveBeenCalled();
        })
    });




    describe("Unit tests for ConfirmationSectionModel", function() {

       it("should select and unselect the confirmation section", function() {
           var menuElement = jasmine.createSpyObj('menu', ['append']);
           var confirmationQuestionModel = jasmine.createSpyObj('confirmationQuestion', ['confirm', 'cancel']);
           var confirmationSectionModel = new ConfirmationSectionModel( confirmationQuestionModel, menuElement);
           confirmationSectionModel.element = jasmine.createSpyObj('element', ['addClass', 'removeClass', 'triggerHandler']);
           confirmationSectionModel.element.find = function () {  // stub out the find method to simply remove an empty jq call
               return jq();
           };
           var question =  jasmine.createSpyObj('question', ['confirm', 'unselect']);
           question.confirm = jasmine.createSpyObj('confirm', ['disable']);
           confirmationSectionModel.questions = [ question ];

           confirmationSectionModel.toggleSelection();
           expect(confirmationSectionModel.element.addClass).toHaveBeenCalledWith('focused');
           expect(confirmationSectionModel.isSelected).toBe(true);

           confirmationSectionModel.toggleSelection();
           expect(confirmationSectionModel.element.removeClass).toHaveBeenCalledWith('focused');
           expect(confirmationSectionModel.isSelected).toBe(false);
       });

	   function _setupSingleQuestion(){
		   const menuElement = jasmine.createSpyObj('menu', ['append']);

		   const fieldParent = $("<div>");

		   const firstField = new FieldModel();
		   firstField.container = jasmine.createSpyObj('container', ['attr']);
		   firstField.element = $("<div>");
		   fieldParent.append(firstField);

		   const secondField = new FieldModel();
		   secondField.container = jasmine.createSpyObj('container', ['attr']);
		   secondField.element = $("<div>");
		   fieldParent.append(secondField);

		   const thirdField = new FieldModel();
		   thirdField.container = jasmine.createSpyObj('container', ['attr']);
		   thirdField.element = $("<div>");
		   fieldParent.append(thirdField);

		   const sectionQuestion = new QuestionModel();
		   sectionQuestion.fields = [firstField, secondField, thirdField];

		   const sectionModel = new SectionModel(null, menuElement);
		   sectionModel.element = jasmine.createSpyObj('element', ['addClass', 'removeClass', 'hasClass']);;
		   sectionModel.questions = [sectionQuestion];

		   const confirmationQuestionModel = jasmine.createSpyObj('confirmationQuestion', ['confirm', 'cancel']);

		   const confirmationQuestion =  jasmine.createSpyObj('question', ['confirm', 'unselect']);
		   confirmationQuestion.confirm = jasmine.createSpyObj('confirm', ['disable', 'enable']);

		   const confirmationSectionModel = new ConfirmationSectionModel( confirmationQuestionModel, menuElement, sectionModel);
		   confirmationSectionModel.element = jasmine.createSpyObj('element', ['addClass', 'removeClass', 'triggerHandler']);
		   confirmationSectionModel.questions = [ confirmationQuestion ];
		   confirmationSectionModel.sections = [ sectionModel ];
		   confirmationSectionModel.element.find = function(){ return jq(); };

		   return {
			   confirmationSectionModel: confirmationSectionModel,
			   sectionQuestion: sectionQuestion,
			   firstField: firstField,
			   secondField: secondField,
			   thirdField: thirdField,
		   };
	   }

	   it("should concat a single line question's multiple answers correctly where no fields are filled", function() {

		   const setup = _setupSingleQuestion();

		   const dataCanvas = $("<div>");
		   setup.confirmationSectionModel.dataCanvas = dataCanvas;

		   const questionTitle = "Test"
		   const firstFieldValue = " ";
		   const secondFieldValue = "";
		   const thirdFieldValue = " ";

		   setup.sectionQuestion.questionLegend.text = function(){ return questionTitle; };
		   setup.firstField.element.val = function(){ return firstFieldValue; };
		   setup.secondField.element.val = function(){ return secondFieldValue; };
		   setup.thirdField.element.val = function(){ return thirdFieldValue; };

		   setup.sectionQuestion.determineDisplayValue();
           setup.confirmationSectionModel.select();
		   expect(dataCanvas.text()).toBe(questionTitle + ": --");
       });

	   it("should concat a single line question's multiple answers correctly where two fields are filled", function() {

		   const setup = _setupSingleQuestion();

		   const dataCanvas = $("<div>");
		   setup.confirmationSectionModel.dataCanvas = dataCanvas;

		   const questionTitle = "Test"
		   const firstFieldValue = "firstField";
		   const secondFieldValue = " ";
		   const thirdFieldValue = "thirdField";

		   setup.sectionQuestion.questionLegend.text = function(){ return questionTitle; };
		   setup.firstField.element.val = function(){ return firstFieldValue; };
		   setup.secondField.element.val = function(){ return secondFieldValue; };
		   setup.thirdField.element.val = function(){ return thirdFieldValue; };

		   setup.sectionQuestion.determineDisplayValue();
           setup.confirmationSectionModel.select();
		   expect(dataCanvas.text()).toBe(questionTitle + ": " + firstFieldValue + ", " + thirdFieldValue);
       });

	   it("should concat a multi-line question's multiple answers correctly where two fields are filled", function() {

		   const setup = _setupSingleQuestion();

		   const dataCanvas = $("<div>");
		   setup.confirmationSectionModel.dataCanvas = dataCanvas;

		   const questionTitle = "Test"

		   const firstFieldLabel = "First Field";
		   const firstFieldValue = "firstField";

		   const secondFieldLabel = " ";
		   const secondFieldValue = " ";

		   const thirdFieldLabel = "Thrid Field";
		   const thirdFieldValue = "thirdField";

		   setup.sectionQuestion.questionLegend.text = function(){ return questionTitle; };
		   setup.sectionQuestion.multiLineInConfirmation = function(){ return true; };

		   setup.firstField.label = firstFieldLabel;
		   setup.firstField.element.val = function(){ return firstFieldValue; };

		   setup.secondField.label = secondFieldLabel;
		   setup.secondField.element.val = function(){ return secondFieldValue; };

		   setup.thirdField.label = thirdFieldLabel;
		   setup.thirdField.element.val = function(){ return thirdFieldValue; };

		   setup.sectionQuestion.determineDisplayValue();
           setup.confirmationSectionModel.select();
		   const confirmationLines = $(dataCanvas.children().eq(0).children());
		   expect(confirmationLines.eq(0).text()).toBe(questionTitle);
		   expect(confirmationLines.eq(1).text()).toBe(firstFieldLabel + ": " + firstFieldValue);
		   expect(confirmationLines.eq(2).text()).toBe(thirdFieldLabel + ": " + thirdFieldValue);
       });

	   function _setupDoubleQuestion(){
		   const menuElement = jasmine.createSpyObj('menu', ['append']);


		   const firstFieldParent = $("<div>");

		   const firstQuestionFirstField = new FieldModel();
		   firstQuestionFirstField.container = jasmine.createSpyObj('container', ['attr']);
		   firstQuestionFirstField.element = $("<div>");
		   firstFieldParent.append(firstQuestionFirstField);

		   const firstQuestionSecondField = new FieldModel();
		   firstQuestionSecondField.container = jasmine.createSpyObj('container', ['attr']);
		   firstQuestionSecondField.element = $("<div>");
		   firstFieldParent.append(firstQuestionSecondField);

		   const firstQuestionThirdField = new FieldModel();
		   firstQuestionThirdField.container = jasmine.createSpyObj('container', ['attr']);
		   firstQuestionThirdField.element = $("<div>");
		   firstFieldParent.append(firstQuestionThirdField);

		   const firstQuestion = new QuestionModel();
		   firstQuestion.fields = [firstQuestionFirstField, firstQuestionSecondField, firstQuestionThirdField];

		   const secondFieldParent = $("<div>");

		   const secondQuestionFirstField = new FieldModel();
		   secondQuestionFirstField.container = jasmine.createSpyObj('container', ['attr']);
		   secondQuestionFirstField.element = $("<div>");
		   secondFieldParent.append(secondQuestionFirstField);

		   const secondQuestionSecondField = new FieldModel();
		   secondQuestionSecondField.container = jasmine.createSpyObj('container', ['attr']);
		   secondQuestionSecondField.element = $("<div>");
		   secondFieldParent.append(secondQuestionSecondField);

		   const secondQuestionThirdField = new FieldModel();
		   secondQuestionThirdField.container = jasmine.createSpyObj('container', ['attr']);
		   secondQuestionThirdField.element = $("<div>");
		   secondFieldParent.append(secondQuestionThirdField);

		   const secondQuestion = new QuestionModel();
		   secondQuestion.fields = [secondQuestionFirstField, secondQuestionSecondField, secondQuestionThirdField];

		   const sectionModel = new SectionModel(null, menuElement);
		   sectionModel.element = jasmine.createSpyObj('element', ['addClass', 'removeClass', 'hasClass']);;
		   sectionModel.questions = [firstQuestion, secondQuestion];

		   const confirmationQuestionModel = jasmine.createSpyObj('confirmationQuestion', ['confirm', 'cancel']);

		   const confirmationQuestion =  jasmine.createSpyObj('question', ['confirm', 'unselect']);
		   confirmationQuestion.confirm = jasmine.createSpyObj('confirm', ['disable', 'enable']);

		   const confirmationSectionModel = new ConfirmationSectionModel( confirmationQuestionModel, menuElement, sectionModel);
		   confirmationSectionModel.element = jasmine.createSpyObj('element', ['addClass', 'removeClass', 'triggerHandler']);
		   confirmationSectionModel.questions = [ confirmationQuestion ];
		   confirmationSectionModel.sections = [ sectionModel ];
		   confirmationSectionModel.element.find = function(){ return jq(); };

		   return {
			   confirmationSectionModel: confirmationSectionModel,
			   firstQuestion: firstQuestion,
			   firstQuestionFirstField: firstQuestionFirstField,
			   firstQuestionSecondField: firstQuestionSecondField,
			   firstQuestionThirdField: firstQuestionThirdField,
			   secondQuestion: secondQuestion,
			   secondQuestionFirstField: secondQuestionFirstField,
			   secondQuestionSecondField: secondQuestionSecondField,
			   secondQuestionThirdField: secondQuestionThirdField,
		   };
	   }

	   it("should concat multiple multi-line and single line questions' multiple answers correctly where two fields and one fields are filled, respectively", function() {

		   const setup = _setupDoubleQuestion();

		   const dataCanvas = $("<div>");
		   setup.confirmationSectionModel.dataCanvas = dataCanvas;

		   const firstQuestionTitle = "Test Question 1"

		   const firstQuestionFirstFieldLabel = "First Question First Field";
		   const firstQuestionFirstFieldValue = "firstQuestionfirstField";

		   const firstQuestionSecondFieldLabel = " ";
		   const firstQuestionSecondFieldValue = " ";

		   const firstQuestionThirdFieldLabel = "First Question Thrid Field";
		   const firstQuestionThirdFieldValue = "firstQuestionThirdField";

		   const secondQuestionTitle = "Test Question 2"

		   const secondQuestionFirstFieldLabel = " ";
		   const secondQuestionFirstFieldValue = " ";

		   const secondQuestionSecondFieldLabel = "Second Question Second Field";
		   const secondQuestionSecondFieldValue = "secondQuestionSecondField";

		   const secondQuestionThirdFieldLabel = " ";
		   const secondQuestionThirdFieldValue = " ";

		   setup.firstQuestion.questionLegend.text = function(){ return firstQuestionTitle; };
		   setup.firstQuestion.multiLineInConfirmation = function(){ return true; };

		   setup.firstQuestionFirstField.label = firstQuestionFirstFieldLabel;
		   setup.firstQuestionFirstField.element.val = function(){ return firstQuestionFirstFieldValue; };

		   setup.firstQuestionSecondField.label = firstQuestionSecondFieldLabel;
		   setup.firstQuestionSecondField.element.val = function(){ return firstQuestionSecondFieldValue; };

		   setup.firstQuestionThirdField.label = firstQuestionThirdFieldLabel;
		   setup.firstQuestionThirdField.element.val = function(){ return firstQuestionThirdFieldValue; };

		   setup.secondQuestion.questionLegend.text = function(){ return secondQuestionTitle; };
		   setup.secondQuestion.multiLineInConfirmation = function(){ return false; };

		   setup.secondQuestionFirstField.label = secondQuestionFirstFieldLabel;
		   setup.secondQuestionFirstField.element.val = function(){ return secondQuestionFirstFieldValue; };

		   setup.secondQuestionSecondField.label = secondQuestionSecondFieldLabel;
		   setup.secondQuestionSecondField.element.val = function(){ return secondQuestionSecondFieldValue; };

		   setup.secondQuestionThirdField.label = secondQuestionThirdFieldLabel;
		   setup.secondQuestionThirdField.element.val = function(){ return secondQuestionThirdFieldValue; };

		   setup.firstQuestion.determineDisplayValue();
		   setup.secondQuestion.determineDisplayValue();
           setup.confirmationSectionModel.select();
		   const confirmationLines = $(dataCanvas.children().eq(0).children());
		   expect(confirmationLines.eq(0).text()).toBe(firstQuestionTitle);
		   expect(confirmationLines.eq(1).text()).toBe(firstQuestionFirstFieldLabel + ": " + firstQuestionFirstFieldValue);
		   expect(confirmationLines.eq(2).text()).toBe(firstQuestionThirdFieldLabel + ": " + firstQuestionThirdFieldValue);
		   expect(confirmationLines.eq(3).text()).toBe(secondQuestionTitle + ": " + secondQuestionSecondFieldValue);
       });
    });
})
