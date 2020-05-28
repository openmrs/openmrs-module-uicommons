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
        var prevButton;

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
       it("should select and unselect the confirmation section",function() {
           var menuElement = jasmine.createSpyObj('menu', ['append']);
           var navButtons = jasmine.createSpyObj('navButtons', ['hide','show']);
           var confirmationQuestionModel = jasmine.createSpyObj('confirmationQuestion', ['confirm', 'cancel']);
           var confirmationSectionModel = new ConfirmationSectionModel( confirmationQuestionModel, menuElement, null, null, navButtons);
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
           expect(navButtons.hide).toHaveBeenCalled();

           confirmationSectionModel.toggleSelection();
           expect(confirmationSectionModel.element.removeClass).toHaveBeenCalledWith('focused');
           expect(confirmationSectionModel.isSelected).toBe(false);
           expect(navButtons.show).toHaveBeenCalled();
       });
    });
})
