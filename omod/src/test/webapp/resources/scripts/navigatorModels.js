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
            fieldModel.element = jasmine.createSpyObj('element', ['focus', 'blur', 'addClass', 'removeClass']);

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


    });

    describe("Unit tests for QuestionModel", function() {

        var questionModel;
        var firstField;
        var secondField;

        beforeEach(function() {
            questionModel = new QuestionModel();
            firstField = jasmine.createSpyObj('firstField', ['unselect', 'resetErrorMessages', 'value', 'displayValue']);
            secondField = jasmine.createSpyObj('secondField', ['unselect', 'resetErrorMessages', 'value', 'displayValue']);
            firstField.element = jasmine.createSpyObj('element', ['addClass', 'removeClass', 'hasClass']);
            secondField.element  = jasmine.createSpyObj('element', ['addClass', 'removeClass', 'hasClass']);
            questionModel.fields = [firstField, secondField];
            questionModel.element = jasmine.createSpyObj('element', ['addClass', 'removeClass']);
            spyOn(questionModel.questionLi, 'addClass');
            spyOn(questionModel.questionLi, 'removeClass');
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
            firstField.value.andReturn("1");
            secondField.value.andReturn("");

            // select the question
            questionModel.toggleSelection();

            // unselect the question
            questionModel.toggleSelection();
            expect(questionModel.questionLi.addClass).toHaveBeenCalledWith("done");
        });

        it("should mark question has done if second field has value", function() {
            firstField.value.andReturn("");
            secondField.value.andReturn("1");

            // select the question
            questionModel.toggleSelection();

            // unselect the question
            questionModel.toggleSelection();
            expect(questionModel.questionLi.addClass).toHaveBeenCalledWith("done");
        });

        it("should mark question has done if both fields have value", function() {
            firstField.value.andReturn("1");
            secondField.value.andReturn("1");

            // select the question
            questionModel.toggleSelection();

            // unselect the question
            questionModel.toggleSelection();
            expect(questionModel.questionLi.addClass).toHaveBeenCalledWith("done");
        });

        it("should not mark question has done if neither fields have value", function() {
            firstField.value.andReturn("");
            secondField.value.andReturn("");
            questionModel.fields = [firstField, secondField];

            // select the question
            questionModel.toggleSelection();

            // unselect the question
            questionModel.toggleSelection();
            expect(questionModel.questionLi.removeClass).toHaveBeenCalledWith("done");
        });

        it("should not mark question as done if expected field does not have value", function() {
            firstField.value.andReturn("1");
            secondField.element.hasClass.andReturn('true');
            secondField.value.andReturn("");

            // select the question
            questionModel.toggleSelection();

            // unselect the question
            questionModel.toggleSelection();
            expect(secondField.element.hasClass).toHaveBeenCalledWith('expected');
            expect(questionModel.questionLi.removeClass).toHaveBeenCalledWith('done');
        });

        it("should mark question as done if expected field has value", function() {
            firstField.value.andReturn("");
            secondField.element.hasClass.andReturn('true');
            secondField.value.andReturn("1");

            // select the question
            questionModel.toggleSelection();

            // unselect the question
            questionModel.toggleSelection();
            expect(secondField.element.hasClass).toHaveBeenCalledWith('expected');
            expect(questionModel.questionLi.addClass).toHaveBeenCalledWith("done");
        });

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
       it("should select and unselect the section", function() {
           var menuElement = jasmine.createSpyObj('menu', ['append']);
           var firstQuestion = jasmine.createSpyObj('firstQuestion', ['unselect']);
           var secondQuestion = jasmine.createSpyObj('secondQuestion', ['unselect']);

           var sectionModel = new SectionModel(null, menuElement);
           sectionModel.title = jasmine.createSpyObj('title', ['addClass', 'removeClass']);
           sectionModel.element = jasmine.createSpyObj('element', ['addClass', 'removeClass']);
           sectionModel.questions = [firstQuestion, secondQuestion];

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
            var menuElement = jasmine.createSpyObj('menu', ['append']);
            var firstQuestion = jasmine.createSpyObj('firstQuestion', ['isValid']);
            var secondQuestion = jasmine.createSpyObj('secondQuestion', ['isValid']);
            firstQuestion.isValid.andReturn(true);
            secondQuestion.isValid.andReturn(true);

            var sectionModel = new SectionModel(null, menuElement);
            sectionModel.questions = [firstQuestion, secondQuestion];

            var isValid = sectionModel.isValid();

            expect(firstQuestion.isValid).toHaveBeenCalled();
            expect(secondQuestion.isValid).toHaveBeenCalled();
            expect(isValid).toBe(true);

        });

        it("should state the section is not valid", function() {
            var menuElement = jasmine.createSpyObj('menu', ['append']);
            var firstQuestion = jasmine.createSpyObj('firstQuestion', ['isValid']);
            var secondQuestion = jasmine.createSpyObj('secondQuestion', ['isValid']);
            firstQuestion.isValid.andReturn(true);
            secondQuestion.isValid.andReturn(false);

            var sectionModel = new SectionModel(null, menuElement);
            sectionModel.questions = [firstQuestion, secondQuestion];

            var isValid = sectionModel.isValid();

            expect(firstQuestion.isValid).toHaveBeenCalled();
            expect(secondQuestion.isValid).toHaveBeenCalled();
            expect(isValid).toBe(false);

        });

        it(" should call exit handlers for question and return true if all handlers return true", function() {
            var menuElement = jasmine.createSpyObj('menu', ['append']);
            var firstQuestion = jasmine.createSpyObj('firstQuestion', ['onExit']);
            var secondQuestion = jasmine.createSpyObj('secondQuestion', ['onExit']);
            firstQuestion.onExit.andReturn(true);
            secondQuestion.onExit.andReturn(true);

            var sectionModel = new SectionModel(null, menuElement);
            sectionModel.questions = [firstQuestion, secondQuestion];

            var onExit = sectionModel.onExit();

            expect(firstQuestion.onExit).toHaveBeenCalled();
            expect(secondQuestion.onExit).toHaveBeenCalled();
            expect(onExit).toBe(true);

        });

        it(" should call exit handlers for question and return false if any handler returns false", function() {
            var menuElement = jasmine.createSpyObj('menu', ['append']);
            var firstQuestion = jasmine.createSpyObj('firstQuestion', ['onExit']);
            var secondQuestion = jasmine.createSpyObj('secondQuestion', ['onExit']);
            firstQuestion.onExit.andReturn(true);
            secondQuestion.onExit.andReturn(false);

            var sectionModel = new SectionModel(null, menuElement);
            sectionModel.questions = [firstQuestion, secondQuestion];

            var onExit = sectionModel.onExit();

            expect(firstQuestion.onExit).toHaveBeenCalled();
            expect(secondQuestion.onExit).toHaveBeenCalled();
            expect(onExit).toBe(false);

        });
    });




    describe("Unit tests for ConfirmationSectionModel", function() {
       it("should select and unselect the confirmation section",function() {
           var menuElement = jasmine.createSpyObj('menu', ['append']);
           var confirmationQuestionModel = jasmine.createSpyObj('confirmationQuestion', ['confirm', 'cancel']);
           var confirmationSectionModel = new ConfirmationSectionModel( confirmationQuestionModel, menuElement);
           confirmationSectionModel.element = jasmine.createSpyObj('element', ['addClass', 'removeClass']);
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
    });
})