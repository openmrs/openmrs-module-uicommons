describe("Tests for simple form navigation handlers", function() {

    describe("Keyboard handlers", function() {
        var fieldsKeyboardHandler, questionsKeyboardHandler;

        describe("Fields Keyboard handler", function() {
            var firstField, secondField, thirdField;
            beforeEach(function() {
                firstField = {isSelected: false, isValid: false, onExit: false, toggleSelection: '', select: ''};
                secondField = {isSelected: false, isValid: false, onExit: false, toggleSelection: ''};
                thirdField = {isSelected: false, isValid: false, onExit: false, toggleSelection: ''};
                questionsKeyboardHandler = jasmine.createSpyObj('questionsHandler',
                        ['handleUpKey', 'handleDownKey', 'selectedQuestion']);
                fieldsKeyboardHandler = new FieldsKeyboardHandler([firstField, secondField, thirdField], questionsKeyboardHandler);
            });

            it("should delegate up key handling if no selected field", function() {
                questionsKeyboardHandler.handleUpKey.andReturn(true);

                var wasHandled = fieldsKeyboardHandler.handleUpKey();

                expect(questionsKeyboardHandler.handleUpKey).toHaveBeenCalled();
                expect(wasHandled).toBe(true);
            });
            it("should not handle up key if there is a selected field", function() {
                secondField.isSelected = true;

                var wasHandled = fieldsKeyboardHandler.handleUpKey();

                expect(wasHandled).toBe(false);
            });

            it("should delegate down key handling if no selected field", function() {
                firstField.isSelected = false; secondField.isSelected = false;
                questionsKeyboardHandler.handleDownKey.andReturn(true);

                var wasHandled = fieldsKeyboardHandler.handleDownKey();

                expect(questionsKeyboardHandler.handleDownKey).toHaveBeenCalled();
                expect(wasHandled).toBe(true);
            });
            it("should not handle down key if there is a selected field", function() {
                secondField.isSelected = true;

                var wasHandled = fieldsKeyboardHandler.handleDownKey();

                expect(wasHandled).toBe(false);
            });

            it("should switch selection to next field within same question", function() {
                spyOn(firstField, 'isValid').andReturn(true);
                spyOn(firstField, 'onExit').andReturn(true);
                spyOn(firstField, 'toggleSelection');
                spyOn(secondField, 'toggleSelection');
                firstField.isSelected = true;
                questionsKeyboardHandler.selectedQuestion.andReturn({fields: [firstField, secondField]});

                var wasHandled = fieldsKeyboardHandler.handleTabKey();

                expect(firstField.onExit).toHaveBeenCalled();
                expect(firstField.toggleSelection).toHaveBeenCalled();
                expect(secondField.toggleSelection).toHaveBeenCalled();
            });
            it("should switch selection to next field within different question", function() {
                spyOn(firstField, 'isValid').andReturn(true);
                spyOn(firstField, 'onExit').andReturn(true);
                spyOn(firstField, 'toggleSelection');
                spyOn(secondField, 'toggleSelection');
                firstField.isSelected = true;

                var firstQuestion = jasmine.createSpyObj('firstQuestion', ['toggleSelection']);
                firstQuestion.fields = [firstQuestion]; firstField.parentQuestion = firstQuestion;
                var secondQuestion = jasmine.createSpyObj('secondQuestion', ['toggleSelection']);
                secondQuestion.fields = [secondQuestion]; secondField.parentQuestion = secondQuestion;
                questionsKeyboardHandler.selectedQuestion.andReturn(firstQuestion);

                var wasHandled = fieldsKeyboardHandler.handleTabKey();

                expect(firstField.onExit).toHaveBeenCalled();
                expect(firstField.toggleSelection).toHaveBeenCalled();
                expect(secondField.toggleSelection).toHaveBeenCalled();
                expect(firstQuestion.toggleSelection).toHaveBeenCalled();
                expect(secondQuestion.toggleSelection).toHaveBeenCalled();
            });
            it("should not switch selection to next field if current field is invalid", function() {
                firstField.isSelected = true;
                spyOn(firstField, 'isValid').andReturn(false);
                spyOn(firstField, 'onExit');
                spyOn(firstField, 'select');

                var wasHandled = fieldsKeyboardHandler.handleTabKey();

                expect(firstField.onExit).not.toHaveBeenCalled();
                expect(firstField.select).toHaveBeenCalled();
                expect(wasHandled).toBe(true);
            });
            it("should not switch selection to next field if exit handler returns false", function() {
                firstField.isSelected = true;
                spyOn(firstField, 'isValid').andReturn(true);
                spyOn(firstField, 'onExit').andReturn(false);
                spyOn(firstField, 'select');

                var wasHandled = fieldsKeyboardHandler.handleTabKey();

                expect(firstField.onExit).toHaveBeenCalled();
                expect(firstField.select).toHaveBeenCalled();
                expect(wasHandled).toBe(true);
            });
            it("should switch selection to previous field within same question", function() {
                spyOn(firstField, 'toggleSelection');
                spyOn(secondField, 'toggleSelection');
                spyOn(secondField, 'onExit').andReturn(true);
                secondField.isSelected = true;
                questionsKeyboardHandler.selectedQuestion.andReturn({fields: [firstField, secondField]});

                var wasHandled = fieldsKeyboardHandler.handleShiftTabKey();

                expect(secondField.toggleSelection).toHaveBeenCalled();
                expect(firstField.toggleSelection).toHaveBeenCalled();
            });
            it("should not switch selection to previous field within same question if exit handler returns false", function() {
                spyOn(firstField, 'toggleSelection');
                spyOn(secondField, 'toggleSelection');
                spyOn(secondField, 'onExit').andReturn(false);
                secondField.isSelected = true;
                questionsKeyboardHandler.selectedQuestion.andReturn({fields: [firstField, secondField]});

                var wasHandled = fieldsKeyboardHandler.handleShiftTabKey();

                expect(secondField.toggleSelection).not.toHaveBeenCalled();
                expect(firstField.toggleSelection).not.toHaveBeenCalled();
            });

            it("should switch selection to next field within different question", function() {
                spyOn(secondField, 'toggleSelection');
                spyOn(thirdField, 'toggleSelection');
                spyOn(thirdField, 'onExit').andReturn(true);
                thirdField.isSelected = true;

                var firstQuestion = jasmine.createSpyObj('firstQuestion', ['toggleSelection']);
                firstQuestion.fields = [firstField, secondField];
                firstField.parentQuestion = firstQuestion;
                secondField.parentQuestion = firstQuestion;
                var secondQuestion = jasmine.createSpyObj('secondQuestion', ['toggleSelection']);
                secondQuestion.fields = [thirdField];
                thirdField.parentQuestion = secondQuestion;
                questionsKeyboardHandler.selectedQuestion.andReturn(secondQuestion);

                var wasHandled = fieldsKeyboardHandler.handleShiftTabKey();

                expect(thirdField.toggleSelection).toHaveBeenCalled();
                expect(secondField.toggleSelection).toHaveBeenCalled();
                expect(secondQuestion.toggleSelection).toHaveBeenCalled();
                expect(firstQuestion.toggleSelection).toHaveBeenCalled();
            });
        });

        describe("Questions Keyboard handler", function() {
            var firstQuestion, secondQuestion;
            beforeEach(function() {
                firstQuestion =  {isSelected: false, isValid: false, onExit: false, toggleSelection: ''};
                secondQuestion =  {isSelected: false, isValid: false, onExit: false, toggleSelection: ''};
                questionsKeyboardHandler = new QuestionsKeyboardHandler([firstQuestion, secondQuestion]);
            });

            it("should switch selection to next question within same section", function() {
                firstQuestion.isSelected = true;
                spyOn(firstQuestion, 'isValid').andReturn(true);
                spyOn(firstQuestion, 'onExit').andReturn(true);
                spyOn(firstQuestion, 'toggleSelection');
                spyOn(secondQuestion, 'toggleSelection');

                var wasHandled = questionsKeyboardHandler.handleDownKey();

                expect(firstQuestion.onExit).toHaveBeenCalled();
                expect(firstQuestion.toggleSelection).toHaveBeenCalled();
                expect(secondQuestion.toggleSelection).toHaveBeenCalled();
                expect(wasHandled).toBe(true);
            });
            it("should switch selection to next question within different section", function() {
                firstQuestion.isSelected = true;
                spyOn(firstQuestion, 'isValid').andReturn(true);
                spyOn(firstQuestion, 'onExit').andReturn(true);
                spyOn(firstQuestion, 'toggleSelection');
                spyOn(secondQuestion, 'toggleSelection');

                var firstSection = jasmine.createSpyObj('firstSection', ['toggleSelection']);
                var secondSection = jasmine.createSpyObj('secondSection', ['toggleSelection']);
                firstSection.questions = [firstQuestion]; secondSection.questions = [secondQuestion];
                firstQuestion.parentSection = firstSection; secondQuestion.parentSection = secondSection;

                questionsKeyboardHandler = new QuestionsKeyboardHandler([firstQuestion, secondQuestion]);
                var wasHandled = questionsKeyboardHandler.handleDownKey();

                expect(firstQuestion.onExit).toHaveBeenCalled();
                expect(firstQuestion.toggleSelection).toHaveBeenCalled();
                expect(secondQuestion.toggleSelection).toHaveBeenCalled();
                expect(firstSection.toggleSelection).toHaveBeenCalled();
                expect(secondSection.toggleSelection).toHaveBeenCalled();
                expect(wasHandled).toBe(true);
            });
            it("should not switch selection to next question if question is not valid", function() {
                firstQuestion.isSelected = true;
                spyOn(firstQuestion, 'isValid').andReturn(false);
                spyOn(firstQuestion, 'onExit').andReturn(true);
                spyOn(firstQuestion, 'toggleSelection');
                spyOn(secondQuestion, 'toggleSelection');

                questionsKeyboardHandler = new QuestionsKeyboardHandler([firstQuestion, secondQuestion]);
                var wasHandled = questionsKeyboardHandler.handleDownKey();

                expect(firstQuestion.onExit).not.toHaveBeenCalled();
                expect(firstQuestion.toggleSelection).not.toHaveBeenCalled();
                expect(secondQuestion.toggleSelection).not.toHaveBeenCalled();
                expect(wasHandled).toBe(true);
            });
            it("should not switch selection to next question if exit handler returns false", function() {
                firstQuestion.isSelected = true;
                spyOn(firstQuestion, 'isValid').andReturn(true);
                spyOn(firstQuestion, 'onExit').andReturn(false);
                spyOn(firstQuestion, 'toggleSelection');
                spyOn(secondQuestion, 'toggleSelection');

                questionsKeyboardHandler = new QuestionsKeyboardHandler([firstQuestion, secondQuestion]);
                var wasHandled = questionsKeyboardHandler.handleDownKey();

                expect(firstQuestion.onExit).toHaveBeenCalled();
                expect(firstQuestion.toggleSelection).not.toHaveBeenCalled();
                expect(secondQuestion.toggleSelection).not.toHaveBeenCalled();
                expect(wasHandled).toBe(true);
            });
            it("should switch selection to previous question within same section", function() {
                secondQuestion.isSelected = true;
                spyOn(secondQuestion, 'isValid').andReturn(true);
                spyOn(secondQuestion, 'onExit').andReturn(true);
                spyOn(firstQuestion, 'toggleSelection');
                spyOn(secondQuestion, 'toggleSelection')

                questionsKeyboardHandler = new QuestionsKeyboardHandler([firstQuestion, secondQuestion]);
                var wasHandled = questionsKeyboardHandler.handleUpKey();

                expect(secondQuestion.onExit).toHaveBeenCalled();
                expect(secondQuestion.toggleSelection).toHaveBeenCalled();
                expect(firstQuestion.toggleSelection).toHaveBeenCalled();
                expect(wasHandled).toBe(true);
            });
            it("should switch selection to previous question if exit handler returns false", function() {
                secondQuestion.isSelected = true;
                spyOn(secondQuestion, 'isValid').andReturn(true);
                spyOn(secondQuestion, 'onExit').andReturn(false);
                spyOn(firstQuestion, 'toggleSelection');
                spyOn(secondQuestion, 'toggleSelection')

                questionsKeyboardHandler = new QuestionsKeyboardHandler([firstQuestion, secondQuestion]);
                var wasHandled = questionsKeyboardHandler.handleUpKey();

                expect(secondQuestion.onExit).toHaveBeenCalled();
                expect(secondQuestion.toggleSelection).not.toHaveBeenCalled();
                expect(firstQuestion.toggleSelection).not.toHaveBeenCalled();
                expect(wasHandled).toBe(true);
            });
            it("should switch selection to previous question within different section", function() {
                secondQuestion.isSelected = true;
                spyOn(secondQuestion, 'isValid').andReturn(true);
                spyOn(secondQuestion, 'onExit').andReturn(true);
                spyOn(firstQuestion, 'toggleSelection');
                spyOn(secondQuestion, 'toggleSelection')

                var firstSection = jasmine.createSpyObj('firstSection', ['toggleSelection']);
                var secondSection = jasmine.createSpyObj('secondSection', ['toggleSelection']);
                firstSection.questions = [firstQuestion];
                secondSection.questions = [secondQuestion];

                firstQuestion.parentSection = firstSection;
                secondQuestion.parentSection = secondSection;

                questionsKeyboardHandler = new QuestionsKeyboardHandler([firstQuestion, secondQuestion]);
                var wasHandled = questionsKeyboardHandler.handleUpKey();

                expect(secondQuestion.onExit).toHaveBeenCalled();
                expect(firstQuestion.toggleSelection).toHaveBeenCalled();
                expect(secondQuestion.toggleSelection).toHaveBeenCalled();
                expect(firstSection.toggleSelection).toHaveBeenCalled();
                expect(secondSection.toggleSelection).toHaveBeenCalled();
                expect(wasHandled).toBe(true);
            });
        });
    });

    describe("Mouse handlers", function() {

        describe("Section mouse handlers", function() {
            var sectionsMouseHandler, firstSection, secondSection, thirdSection, question, field, event, sections;
            beforeEach(function() {
                firstSection = {isSelected: false, toggleSelection: '', isValid: '', onExit:'', title: $('<li></li>')};
                secondSection = {isSelected: false, toggleSelection: '', isValid: '', onExit:'', title: $('<li></li>')};
                thirdSection = {isSelected: false, toggleSelection: '', isValid: '', title: $('<li></li>')};
                event = {stopPropagation: ''};

                field = {isSelected: true, toggleSelection: '', select: ''};
                question = {fields: [field], toggleSelection: '', isSelected: true};

                sections = [firstSection, secondSection, thirdSection];
            });

            it("should switch selection to section ahead if current section is valid", function() {
                spyOn(event, 'stopPropagation');
                spyOn(firstSection, 'isValid').andReturn(true);
                spyOn(firstSection, 'onExit').andReturn(true);
                spyOn(firstSection, 'toggleSelection');
                spyOn(secondSection, 'toggleSelection');
                spyOn(question, 'toggleSelection');
                spyOn(field, 'toggleSelection');
                firstSection.isSelected = true;
                secondSection.questions = [question];

                clickedSectionHandler(sections, secondSection, event);

                expect(event.stopPropagation).toHaveBeenCalled();
                expect(firstSection.onExit).toHaveBeenCalled();
                expect(firstSection.toggleSelection).toHaveBeenCalled();
                expect(secondSection.toggleSelection).toHaveBeenCalled();
                expect(question.toggleSelection).toHaveBeenCalled();
                expect(field.toggleSelection).toHaveBeenCalled();
            });
            it("should not switch selection to section ahead if current section is not valid", function() {
                spyOn(event, 'stopPropagation');
                spyOn(firstSection, 'isValid').andReturn(false);
                spyOn(firstSection, 'onExit').andReturn(true);
                spyOn(field, 'select');
                firstSection.isSelected = true;
                firstSection.questions = [question];

                clickedSectionHandler(sections, secondSection, event);

                expect(firstSection.onExit).not.toHaveBeenCalled();
                expect(event.stopPropagation).toHaveBeenCalled();
                expect(field.select).toHaveBeenCalled();
            });
            it("should not switch selection to section ahead if exit handler returns false", function() {
                spyOn(event, 'stopPropagation');
                spyOn(firstSection, 'isValid').andReturn(true);
                spyOn(firstSection, 'onExit').andReturn(false);
                spyOn(field, 'select');
                firstSection.isSelected = true;
                firstSection.questions = [question];

                clickedSectionHandler(sections, secondSection, event);

                expect(firstSection.onExit).toHaveBeenCalled();
                expect(event.stopPropagation).toHaveBeenCalled();
                expect(field.select).toHaveBeenCalled();
            });
            it("should not switch selection to section ahead if section in between is not valid", function() {
                spyOn(event, 'stopPropagation');
                spyOn(firstSection, 'isValid').andReturn(true);
                spyOn(firstSection, 'onExit').andReturn(true);
                spyOn(secondSection, 'isValid').andReturn(false);
                spyOn(field, 'select');
                firstSection.isSelected = true;
                firstSection.questions = [question];

                clickedSectionHandler(sections, thirdSection, event);

                expect(firstSection.onExit).not.toHaveBeenCalled();
                expect(event.stopPropagation).toHaveBeenCalled();
                expect(field.select).toHaveBeenCalled();
            });
            it("should switch selection to section ahead but not call exit handler for in between section", function() {
                spyOn(event, 'stopPropagation');
                spyOn(firstSection, 'toggleSelection');
                spyOn(thirdSection, 'toggleSelection');
                spyOn(question, 'toggleSelection');
                spyOn(field, 'toggleSelection');
                spyOn(firstSection, 'isValid').andReturn(true);
                spyOn(firstSection, 'onExit').andReturn(true);
                spyOn(secondSection, 'isValid').andReturn(true);
                spyOn(secondSection, 'onExit');
                spyOn(field, 'select');
                firstSection.isSelected = true;
                thirdSection.questions = [question];
                question.fields = [field];

                clickedSectionHandler(sections, thirdSection, event);

                expect(firstSection.onExit).toHaveBeenCalled();
                expect(secondSection.onExit).not.toHaveBeenCalled();
                expect(event.stopPropagation).toHaveBeenCalled();
                expect(firstSection.toggleSelection).toHaveBeenCalled();
                expect(thirdSection.toggleSelection).toHaveBeenCalled();
                expect(question.toggleSelection).toHaveBeenCalled();
                expect(field.toggleSelection).toHaveBeenCalled();
            });
            it("should switch selection to section behind", function() {
                spyOn(event, 'stopPropagation');
                spyOn(firstSection, 'toggleSelection');
                spyOn(secondSection, 'toggleSelection');
                spyOn(secondSection, 'onExit').andReturn(true);
                spyOn(question, 'toggleSelection');
                spyOn(field, 'toggleSelection');
                secondSection.isSelected = true;
                firstSection.questions = [question];

                clickedSectionHandler(sections, firstSection, event);

                expect(secondSection.onExit).toHaveBeenCalled();
                expect(event.stopPropagation).toHaveBeenCalled();
                expect(firstSection.toggleSelection).toHaveBeenCalled();
                expect(secondSection.toggleSelection).toHaveBeenCalled();
                expect(question.toggleSelection).toHaveBeenCalled();
                expect(field.toggleSelection).toHaveBeenCalled();
            });
            it("should not switch selection to section behind if exit handler returns false", function() {
                spyOn(event, 'stopPropagation');
                spyOn(firstSection, 'toggleSelection');
                spyOn(secondSection, 'toggleSelection');
                spyOn(secondSection, 'onExit').andReturn(false);
                spyOn(question, 'toggleSelection');
                spyOn(field, 'toggleSelection');
                spyOn(field, 'select');
                secondSection.isSelected = true;
                secondSection.questions = [question];
                question.fields = [field];

                clickedSectionHandler(sections, firstSection, event);

                expect(secondSection.onExit).toHaveBeenCalled();
                expect(event.stopPropagation).toHaveBeenCalled();
                expect(field.select).toHaveBeenCalled();
                expect(firstSection.toggleSelection).not.toHaveBeenCalled();
                expect(secondSection.toggleSelection).not.toHaveBeenCalled();
                expect(question.toggleSelection).not.toHaveBeenCalled();
                expect(field.toggleSelection).not.toHaveBeenCalled();
            });
        });

        describe("Question mouse handlers", function() {
           var firstQuestion, secondQuestion, thirdQuestion, field, event, questions;
            beforeEach(function() {
                firstQuestion = {isSelected: false, toggleSelection: '', isValid: '', onExit: '', questionLi: $('<li></li>'), select: ''};
                secondQuestion = {isSelected: false, toggleSelection: '', isValid: '', onExit: '', questionLi: $('<li></li>')};
                thirdQuestion = {isSelected: false, toggleSelection: '', questionLi: $('<li></li>')};
                event = {stopPropagation: ''};

                field = {isSelected: false, toggleSelection: '', select: ''};

                questions = [firstQuestion, secondQuestion, thirdQuestion];
            });

            it("should switch selection to question ahead if current question is valid", function() {
                spyOn(event, 'stopPropagation');
                spyOn(firstQuestion, 'isValid').andReturn(true);
                spyOn(firstQuestion, 'onExit').andReturn(true);
                spyOn(firstQuestion, 'toggleSelection');
                spyOn(secondQuestion, 'toggleSelection');
                spyOn(field, 'toggleSelection');
                firstQuestion.isSelected = true;
                secondQuestion.fields = [field];

                clickedQuestionHandler(questions, secondQuestion, event);

                expect(event.stopPropagation).toHaveBeenCalled();
                expect(firstQuestion.onExit).toHaveBeenCalled();
                expect(firstQuestion.toggleSelection).toHaveBeenCalled();
                expect(secondQuestion.toggleSelection).toHaveBeenCalled();
            });
            it("should not switch selection to question ahead if current question is not valid", function() {
                spyOn(event, 'stopPropagation');
                spyOn(firstQuestion, 'isValid').andReturn(false)
                spyOn(firstQuestion, 'onExit').andReturn(true);;
                spyOn(field, 'select');
                firstQuestion.isSelected = true;
                field.isSelected = true;
                firstQuestion.fields = [field];

                clickedQuestionHandler(questions, secondQuestion, event);

                expect(firstQuestion.onExit).not.toHaveBeenCalled();
                expect(event.stopPropagation).toHaveBeenCalled();
                expect(field.select).toHaveBeenCalled();
            });
            it("should not switch selection to question ahead if question in between is not valid", function() {
                spyOn(event, 'stopPropagation');
                spyOn(firstQuestion, 'isValid').andReturn(true);
                spyOn(firstQuestion, 'onExit').andReturn(true);
                spyOn(secondQuestion, 'isValid').andReturn(false);
                spyOn(field, 'select');
                firstQuestion.isSelected=true;
                field.isSelected = true;
                firstQuestion.fields = [field];

                clickedQuestionHandler(questions, thirdQuestion, event);

                expect(firstQuestion.onExit).not.toHaveBeenCalled();
                expect(event.stopPropagation).toHaveBeenCalled();
                expect(field.select).toHaveBeenCalled();
            });
            it("should switch selection to question ahead but not call exit handler on in-between method", function() {
                spyOn(event, 'stopPropagation');
                spyOn(firstQuestion, 'isValid').andReturn(true);
                spyOn(firstQuestion, 'onExit').andReturn(true);
                spyOn(secondQuestion, 'isValid').andReturn(true);
                spyOn(secondQuestion, 'onExit')
                spyOn(firstQuestion, 'toggleSelection');
                spyOn(secondQuestion, 'toggleSelection');
                spyOn(thirdQuestion, 'toggleSelection')
                spyOn(field, 'toggleSelection');
                firstQuestion.isSelected=true;

                thirdQuestion.fields = [field];

                clickedQuestionHandler(questions, thirdQuestion, event);

                expect(event.stopPropagation).toHaveBeenCalled();
                expect(firstQuestion.onExit).toHaveBeenCalled();
                expect(secondQuestion.onExit).not.toHaveBeenCalled();
                expect(firstQuestion.toggleSelection).toHaveBeenCalled();
                expect(secondQuestion.toggleSelection).not.toHaveBeenCalled();
                expect(thirdQuestion.toggleSelection).toHaveBeenCalled();
                expect(field.toggleSelection).toHaveBeenCalled();
            });
            it("should switch selection to question behind", function() {
                spyOn(event, 'stopPropagation');
                spyOn(secondQuestion, 'isValid').andReturn(true);
                spyOn(secondQuestion, 'onExit').andReturn(true);
                spyOn(firstQuestion, 'toggleSelection');
                spyOn(secondQuestion, 'toggleSelection');
                spyOn(field, 'toggleSelection');
                secondQuestion.isSelected = true;
                firstQuestion.fields = [field];

                clickedQuestionHandler(questions, firstQuestion, event);

                expect(secondQuestion.onExit).toHaveBeenCalled();
                expect(event.stopPropagation).toHaveBeenCalled();
                expect(firstQuestion.toggleSelection).toHaveBeenCalled();
                expect(secondQuestion.toggleSelection).toHaveBeenCalled();
            });
            it("should not switch selection to question ahead if exit handler returns false", function() {
                spyOn(event, 'stopPropagation');
                spyOn(firstQuestion, 'isValid').andReturn(true)
                spyOn(firstQuestion, 'onExit').andReturn(false);
                spyOn(field, 'select');
                firstQuestion.isSelected = true;
                field.isSelected = true;
                firstQuestion.fields = [field];

                clickedQuestionHandler(questions, secondQuestion, event);

                expect(event.stopPropagation).toHaveBeenCalled();
                expect(field.select).toHaveBeenCalled();
            });
            it("should not switch selection to question behind if exit handler returns false", function() {
                spyOn(event, 'stopPropagation');
                spyOn(secondQuestion, 'isValid').andReturn(true);
                spyOn(secondQuestion, 'onExit').andReturn(false);
                spyOn(firstQuestion, 'toggleSelection');
                spyOn(secondQuestion, 'toggleSelection');
                spyOn(field, 'toggleSelection');
                secondQuestion.isSelected = true;
                firstQuestion.fields = [field];

                clickedQuestionHandler(questions, firstQuestion, event);

                expect(secondQuestion.onExit).toHaveBeenCalled();
                expect(event.stopPropagation).toHaveBeenCalled();
                expect(firstQuestion.toggleSelection).not.toHaveBeenCalled();
                expect(secondQuestion.toggleSelection).not.toHaveBeenCalled();
            });

        });

        describe("Fields mouse handlers", function() {
            var firstField, secondField, thirdField, event, fields;
            beforeEach(function() {
                firstField = {isSelected: false, toggleSelection: '', isValid: '', onExit: '', element: $('<input />'), select:''};
                secondField = {isSelected: false, toggleSelection: '', isValid: '', onExit: '', element: $('<input />'), select:''};
                thirdField = {isSelected: false, toggleSelection: '', element: $('<input />') };
                event = {preventDefault: ''};
                fields = [firstField, secondField, thirdField];
            });

            it("should switch selection to field ahead if current field is valid", function() {
                spyOn(firstField, 'isValid').andReturn(true);
                spyOn(firstField, 'onExit').andReturn(true);
                spyOn(firstField, 'toggleSelection');
                spyOn(secondField, 'toggleSelection');
                spyOn(event, 'preventDefault');
                firstField.isSelected=true;

                clickedFieldHandler(fields, secondField, event);

                expect(firstField.onExit).toHaveBeenCalled();
                expect(firstField.toggleSelection).toHaveBeenCalled();
                expect(secondField.toggleSelection).toHaveBeenCalled();
                expect(event.preventDefault).toHaveBeenCalled();
            });
            it("should not switch selection to field ahead if current field is not valid", function() {
                spyOn(firstField, 'isValid').andReturn(false);
                spyOn(firstField, 'onExit').andReturn(true);
                spyOn(firstField, 'select');
                spyOn(event, 'preventDefault');
                firstField.isSelected=true;

                clickedFieldHandler(fields, secondField, event);

                expect(firstField.onExit).not.toHaveBeenCalled();
                expect(firstField.select).toHaveBeenCalled();
                expect(event.preventDefault).toHaveBeenCalled();
            });
            it("should not switch selection to field ahead if field in between is not valid", function() {
                spyOn(firstField, 'isValid').andReturn(true);
                spyOn(firstField, 'onExit').andReturn(true)
                spyOn(secondField, 'isValid').andReturn(false);
                spyOn(firstField, 'select');
                spyOn(event, 'preventDefault');
                firstField.isSelected=true;

                clickedFieldHandler(fields, thirdField, event);

                expect(firstField.onExit).not.toHaveBeenCalled();
                expect(firstField.select).toHaveBeenCalled();
                expect(event.preventDefault).toHaveBeenCalled();
            });
            it("should not switch selection to field ahead if exit handler returns false", function() {
                spyOn(firstField, 'isValid').andReturn(true);
                spyOn(firstField, 'onExit').andReturn(false)
                spyOn(secondField, 'isValid').andReturn(true);;
                spyOn(firstField, 'select');
                spyOn(event, 'preventDefault');
                firstField.isSelected=true;

                clickedFieldHandler(fields, thirdField, event);

                expect(firstField.onExit).toHaveBeenCalled();
                expect(firstField.select).toHaveBeenCalled();
                expect(event.preventDefault).toHaveBeenCalled();
            });
            it("should switch selection to field ahead but not call in-between exit handler", function() {
                spyOn(firstField, 'isValid').andReturn(true);
                spyOn(firstField, 'onExit').andReturn(true);
                spyOn(secondField, 'isValid').andReturn(true);
                spyOn(secondField, 'onExit').andReturn(true);
                spyOn(firstField, 'select');
                spyOn(firstField, 'toggleSelection');
                spyOn(thirdField, 'toggleSelection');
                spyOn(event, 'preventDefault');
                firstField.isSelected=true;

                clickedFieldHandler(fields, thirdField, event);

                expect(firstField.onExit).toHaveBeenCalled();
                expect(secondField.onExit).not.toHaveBeenCalled();
                expect(firstField.toggleSelection).toHaveBeenCalled();
                expect(thirdField.toggleSelection).toHaveBeenCalled();
                expect(event.preventDefault).toHaveBeenCalled();
            });
            it("should switch selection to field behind", function() {
                spyOn(firstField, 'toggleSelection');
                spyOn(secondField, 'toggleSelection');
                spyOn(secondField, 'onExit').andReturn(true)
                spyOn(event, 'preventDefault');
                secondField.isSelected=true;

                clickedFieldHandler(fields, firstField, event);

                expect(secondField.onExit).toHaveBeenCalled();
                expect(firstField.toggleSelection).toHaveBeenCalled();
                expect(secondField.toggleSelection).toHaveBeenCalled();
                expect(event.preventDefault).toHaveBeenCalled();
            });
            it("should not switch selection to field behind if exit handler returns false", function() {
                spyOn(firstField, 'toggleSelection');
                spyOn(secondField, 'toggleSelection');
                spyOn(secondField, 'onExit').andReturn(false);
                spyOn(event, 'preventDefault');
                spyOn(secondField, 'select');
                secondField.isSelected=true;

                clickedFieldHandler(fields, firstField, event);

                expect(secondField.select).toHaveBeenCalled();
                expect(secondField.onExit).toHaveBeenCalled();
                expect(firstField.toggleSelection).not.toHaveBeenCalled();
                expect(secondField.toggleSelection).not.toHaveBeenCalled();
                expect(event.preventDefault).toHaveBeenCalled();
            });
            it("should not prevent default action on event if click is on current field", function() {
                spyOn(firstField, 'select');
                firstField.isSelected=true;

                clickedFieldHandler(fields, firstField, event);

                expect(firstField.select).toHaveBeenCalled();
            });
        });
    });
})