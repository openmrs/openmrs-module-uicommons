describe("Tests for simple form navigation handlers", function() {

    describe("Keyboard handlers", function() {
        var fieldsKeyboardHandler, questionsHandler;

        describe("Fields Keyboard handler", function() {
            var firstField, secondField, thirdField;
            beforeEach(function() {
                firstField = {isSelected: false, isValid: false, onExit: false, toggleSelection: '', select: '', isDisabled: false, requireMouseExit: function() { return false } };
                secondField = {isSelected: false, isValid: false, onExit: false, toggleSelection: '', isDisabled: false};
                thirdField = {isSelected: false, isValid: false, onExit: false, toggleSelection: '', isDisabled: false};
                questionsHandler = jasmine.createSpyObj('questionsHandler',
                        ['prevQuestion', 'nextQuestion', 'isAfterSelectedQuestion', 'selectedQuestion']);
                fieldsKeyboardHandler = new FieldsKeyboardHandler([firstField, secondField, thirdField], questionsHandler);
            });

            it("should delegate up key handling if no selected field", function() {
                questionsHandler.prevQuestion.and.returnValue(true);

                var wasHandled = fieldsKeyboardHandler.handleUpKey();

                expect(questionsHandler.prevQuestion).toHaveBeenCalled();
                expect(wasHandled).toBe(true);
            });
            it("should not handle up key if there is a selected field", function() {
                secondField.isSelected = true;

                var wasHandled = fieldsKeyboardHandler.handleUpKey();

                expect(wasHandled).toBe(false);
            });

            it("should delegate down key handling if no selected field", function() {
                firstField.isSelected = false; secondField.isSelected = false;
                questionsHandler.nextQuestion.and.returnValue(true);

                var wasHandled = fieldsKeyboardHandler.handleDownKey();

                expect(questionsHandler.nextQuestion).toHaveBeenCalled();
                expect(wasHandled).toBe(true);
            });
            it("should not handle down key if there is a selected field", function() {
                secondField.isSelected = true;

                var wasHandled = fieldsKeyboardHandler.handleDownKey();

                expect(wasHandled).toBe(false);
            });

            it("should switch selection to next field within same question", function() {
                spyOn(firstField, 'isValid').and.returnValue(true);
                spyOn(firstField, 'onExit').and.returnValue(true);
                spyOn(firstField, 'toggleSelection');
                spyOn(secondField, 'toggleSelection');
                spyOn(secondField, 'isDisabled').and.returnValue(false);
                firstField.isSelected = true;
                questionsHandler.selectedQuestion.and.returnValue({fields: [firstField, secondField]});

                var wasHandled = fieldsKeyboardHandler.handleTabKey();

                expect(firstField.onExit).toHaveBeenCalled();
                expect(firstField.toggleSelection).toHaveBeenCalled();
                expect(secondField.toggleSelection).toHaveBeenCalled();
            });

            it("should switch selection to next field within different question", function() {
                spyOn(firstField, 'isValid').and.returnValue(true);
                spyOn(firstField, 'onExit').and.returnValue(true);
                spyOn(firstField, 'toggleSelection');
                spyOn(secondField, 'toggleSelection');
                spyOn(secondField, 'isDisabled').and.returnValue(false);
                firstField.isSelected = true;

                var firstQuestion = jasmine.createSpyObj('firstQuestion', ['toggleSelection', 'isValid']);
                firstQuestion.fields = [firstQuestion]; firstField.parentQuestion = firstQuestion;
                firstQuestion.isValid.and.returnValue(true);
                var secondQuestion = jasmine.createSpyObj('secondQuestion', ['toggleSelection']);
                secondQuestion.fields = [secondQuestion]; secondField.parentQuestion = secondQuestion;
                questionsHandler.selectedQuestion.and.returnValue(firstQuestion);
                questionsHandler.isAfterSelectedQuestion.and.returnValue(true);
                var wasHandled = fieldsKeyboardHandler.handleTabKey();

                expect(firstField.onExit).toHaveBeenCalled();
                expect(firstField.toggleSelection).toHaveBeenCalled();
                expect(secondField.toggleSelection).toHaveBeenCalled();
                expect(firstQuestion.toggleSelection).toHaveBeenCalled();
                expect(secondQuestion.toggleSelection).toHaveBeenCalled();
            });
            it("should not switch selection to next field if current field is invalid", function() {
                firstField.isSelected = true;
                spyOn(firstField, 'isValid').and.returnValue(false);
                spyOn(firstField, 'onExit');
                spyOn(firstField, 'select');

                var wasHandled = fieldsKeyboardHandler.handleTabKey();

                expect(firstField.onExit).not.toHaveBeenCalled();
                expect(firstField.select).toHaveBeenCalled();
                expect(wasHandled).toBe(true);
            });
            it("should not switch selection to next field if exit handler returns false", function() {
                firstField.isSelected = true;
                spyOn(firstField, 'isValid').and.returnValue(true);
                spyOn(firstField, 'onExit').and.returnValue(false);
                spyOn(firstField, 'select');

                var wasHandled = fieldsKeyboardHandler.handleTabKey();

                expect(firstField.onExit).toHaveBeenCalled();
                expect(firstField.select).toHaveBeenCalled();
                expect(wasHandled).toBe(true);
            });
            it("should switch selection to previous field within same question", function() {
                spyOn(firstField, 'toggleSelection');
                spyOn(firstField, 'isDisabled').and.returnValue(false);
                spyOn(secondField, 'toggleSelection');
                spyOn(secondField, 'onExit').and.returnValue(true);
                secondField.isSelected = true;
                questionsHandler.selectedQuestion.and.returnValue({fields: [firstField, secondField]});

                var wasHandled = fieldsKeyboardHandler.handleShiftTabKey();

                expect(secondField.toggleSelection).toHaveBeenCalled();
                expect(firstField.toggleSelection).toHaveBeenCalled();
            });
            it("should not switch selection to previous field within same question if exit handler returns false", function() {
                spyOn(firstField, 'toggleSelection');
                spyOn(secondField, 'toggleSelection');
                spyOn(secondField, 'onExit').and.returnValue(false);
                secondField.isSelected = true;
                questionsHandler.selectedQuestion.and.returnValue({fields: [firstField, secondField]});

                var wasHandled = fieldsKeyboardHandler.handleShiftTabKey();

                expect(secondField.toggleSelection).not.toHaveBeenCalled();
                expect(firstField.toggleSelection).not.toHaveBeenCalled();
            });

            it("should switch selection to next field within different question", function() {
                spyOn(secondField, 'toggleSelection');
                spyOn(secondField, 'isDisabled').and.returnValue(false);
                spyOn(thirdField, 'toggleSelection');
                spyOn(thirdField, 'onExit').and.returnValue(true);
                thirdField.isSelected = true;

                var firstQuestion = jasmine.createSpyObj('firstQuestion', ['toggleSelection']);
                firstQuestion.fields = [firstField, secondField];
                firstField.parentQuestion = firstQuestion;
                secondField.parentQuestion = firstQuestion;
                var secondQuestion = jasmine.createSpyObj('secondQuestion', ['toggleSelection', 'isValid']);
                secondQuestion.fields = [thirdField];
                secondQuestion.isValid.and.returnValue(true);
                thirdField.parentQuestion = secondQuestion;
                questionsHandler.selectedQuestion.and.returnValue(secondQuestion);

                var wasHandled = fieldsKeyboardHandler.handleShiftTabKey();

                expect(thirdField.toggleSelection).toHaveBeenCalled();
                expect(secondField.toggleSelection).toHaveBeenCalled();
                expect(secondQuestion.toggleSelection).toHaveBeenCalled();
                expect(firstQuestion.toggleSelection).toHaveBeenCalled();
            });

            it("should skip disabled field when navigating forward", function() {
                spyOn(firstField, 'isValid').and.returnValue(true);
                spyOn(firstField, 'onExit').and.returnValue(true);
                spyOn(firstField, 'toggleSelection');
                spyOn(secondField, 'toggleSelection');
                spyOn(thirdField, 'toggleSelection');
                spyOn(secondField, 'isDisabled').and.returnValue(true);
                spyOn(thirdField, 'isDisabled').and.returnValue(false);
                firstField.isSelected = true;
                questionsHandler.selectedQuestion.and.returnValue({fields: [firstField, secondField, thirdField]});

                var wasHandled = fieldsKeyboardHandler.handleTabKey();

                expect(firstField.onExit).toHaveBeenCalled();
                expect(firstField.toggleSelection).toHaveBeenCalled();
                expect(secondField.toggleSelection).not.toHaveBeenCalled();
                expect(thirdField.toggleSelection).toHaveBeenCalled();
            });

            it("should skip disabled field when navigating backwards", function() {
                spyOn(thirdField, 'isValid').and.returnValue(true);
                spyOn(thirdField, 'onExit').and.returnValue(true);
                spyOn(firstField, 'toggleSelection');
                spyOn(secondField, 'toggleSelection');
                spyOn(thirdField, 'toggleSelection');
                spyOn(firstField, 'isDisabled').and.returnValue(false);
                spyOn(secondField, 'isDisabled').and.returnValue(true);
                thirdField.isSelected = true;
                questionsHandler.selectedQuestion.and.returnValue({fields: [firstField, secondField, thirdField]});

                var wasHandled = fieldsKeyboardHandler.handleShiftTabKey();

                expect(thirdField.onExit).toHaveBeenCalled();
                expect(firstField.toggleSelection).toHaveBeenCalled();
                expect(secondField.toggleSelection).not.toHaveBeenCalled();
                expect(thirdField.toggleSelection).toHaveBeenCalled();
            });

            it("should not advance if all following fields are disabled", function() {
                spyOn(firstField, 'isValid').and.returnValue(true);
                spyOn(firstField, 'onExit').and.returnValue(true);
                spyOn(firstField, "toggleSelection");
                spyOn(firstField, 'isDisabled').and.returnValue(false);
                spyOn(secondField, 'isDisabled').and.returnValue(true);
                spyOn(thirdField, 'isDisabled').and.returnValue(true);
                firstField.isSelected = true;
                questionsHandler.selectedQuestion.and.returnValue({fields: [firstField, secondField, thirdField]});

                var wasHandled = fieldsKeyboardHandler.handleTabKey();

                expect(firstField.isSelected).toBe(true);
                expect(firstField.toggleSelection.calls.count()).toBe(2);   // ideally this would be called 0 times, instead of being toggled off and back on
            });

            it("should not move back if all following fields are disabled", function() {
                spyOn(thirdField, 'isValid').and.returnValue(true);
                spyOn(thirdField, 'onExit').and.returnValue(true);
                spyOn(thirdField, "toggleSelection");
                spyOn(firstField, 'isDisabled').and.returnValue(true);
                spyOn(secondField, 'isDisabled').and.returnValue(true);
                spyOn(thirdField, 'isDisabled').and.returnValue(false);
                thirdField.isSelected = true;
                questionsHandler.selectedQuestion.and.returnValue({fields: [firstField, secondField, thirdField]});

                var wasHandled = fieldsKeyboardHandler.handleShiftTabKey();

                expect(thirdField.isSelected).toBe(true);
                expect(thirdField.toggleSelection.calls.count()).toBe(2);   // ideally this would be called 0 times, instead of being toggled off and back on
            });

        });

        describe("Questions Keyboard handler", function() {
            var firstQuestion, secondQuestion, thirdQuestion, questionsHandler, prevButton;
            beforeEach(function() {
                firstQuestion =  {isSelected: false, isValid: false, onExit: false, toggleSelection: '', isDisabled: false};
                secondQuestion =  {isSelected: false, isValid: false, onExit: false, toggleSelection: '', isDisabled: false};
                thirdQuestion =  {isSelected: false, isValid: false, onExit: false, toggleSelection: '', isDisabled: false};
                prevButton = jasmine.createSpyObj('prevButton', ['hide', 'show']);
            });

            it("should switch selection to next question within same section", function() {
                firstQuestion.isSelected = true;
                spyOn(firstQuestion, 'isValid').and.returnValue(true);
                spyOn(firstQuestion, 'onExit').and.returnValue(true);
                spyOn(secondQuestion, 'isDisabled').and.returnValue(false);
                spyOn(firstQuestion, 'toggleSelection');
                spyOn(secondQuestion, 'toggleSelection');

                questionsHandler = new QuestionsHandler([firstQuestion, secondQuestion], prevButton);
                var wasHandled = questionsHandler.nextQuestion();

                expect(firstQuestion.onExit).toHaveBeenCalled();
                expect(firstQuestion.toggleSelection).toHaveBeenCalled();
                expect(secondQuestion.toggleSelection).toHaveBeenCalled();
                expect(wasHandled).toBe(true);
            });
            it("should switch selection to next question within different section", function() {
                firstQuestion.isSelected = true;
                spyOn(firstQuestion, 'isValid').and.returnValue(true);
                spyOn(firstQuestion, 'onExit').and.returnValue(true);
                spyOn(secondQuestion, 'isDisabled').and.returnValue(false);
                spyOn(firstQuestion, 'toggleSelection');
                spyOn(secondQuestion, 'toggleSelection');

                var firstSection = jasmine.createSpyObj('firstSection', ['toggleSelection']);
                var secondSection = jasmine.createSpyObj('secondSection', ['toggleSelection']);
                firstSection.questions = [firstQuestion]; secondSection.questions = [secondQuestion];
                firstQuestion.parentSection = firstSection; secondQuestion.parentSection = secondSection;

                questionsHandler = new QuestionsHandler([firstQuestion, secondQuestion], prevButton);
                var wasHandled = questionsHandler.nextQuestion();

                expect(firstQuestion.onExit).toHaveBeenCalled();
                expect(firstQuestion.toggleSelection).toHaveBeenCalled();
                expect(secondQuestion.toggleSelection).toHaveBeenCalled();
                expect(firstSection.toggleSelection).toHaveBeenCalled();
                expect(secondSection.toggleSelection).toHaveBeenCalled();
                expect(wasHandled).toBe(true);
            });
            it("should not switch selection to next question if question is not valid", function() {
                firstQuestion.isSelected = true;
                spyOn(firstQuestion, 'isValid').and.returnValue(false);
                spyOn(firstQuestion, 'onExit').and.returnValue(true);
                spyOn(firstQuestion, 'toggleSelection');
                spyOn(secondQuestion, 'toggleSelection');

                questionsHandler = new QuestionsHandler([firstQuestion, secondQuestion], prevButton);
                var wasHandled = questionsHandler.nextQuestion();

                expect(firstQuestion.onExit).not.toHaveBeenCalled();
                expect(firstQuestion.toggleSelection).not.toHaveBeenCalled();
                expect(secondQuestion.toggleSelection).not.toHaveBeenCalled();
                expect(wasHandled).toBe(true);
            });
            it("should not switch selection to next question if exit handler returns false", function() {
                firstQuestion.isSelected = true;
                spyOn(firstQuestion, 'isValid').and.returnValue(true);
                spyOn(firstQuestion, 'onExit').and.returnValue(false);
                spyOn(firstQuestion, 'toggleSelection');
                spyOn(secondQuestion, 'toggleSelection');

                questionsHandler = new QuestionsHandler([firstQuestion, secondQuestion], prevButton);
                var wasHandled = questionsHandler.nextQuestion();

                expect(firstQuestion.onExit).toHaveBeenCalled();
                expect(firstQuestion.toggleSelection).not.toHaveBeenCalled();
                expect(secondQuestion.toggleSelection).not.toHaveBeenCalled();
                expect(wasHandled).toBe(true);
            });
            it("should switch selection to previous question within same section", function() {
                secondQuestion.isSelected = true;
                spyOn(firstQuestion, 'isDisabled').and.returnValue(false);
                spyOn(secondQuestion, 'isValid').and.returnValue(true);
                spyOn(secondQuestion, 'onExit').and.returnValue(true);
                spyOn(firstQuestion, 'toggleSelection');
                spyOn(secondQuestion, 'toggleSelection');

                questionsHandler = new QuestionsHandler([firstQuestion, secondQuestion], prevButton);
                var wasHandled = questionsHandler.prevQuestion();

                expect(secondQuestion.onExit).toHaveBeenCalled();
                expect(secondQuestion.toggleSelection).toHaveBeenCalled();
                expect(firstQuestion.toggleSelection).toHaveBeenCalled();
                expect(wasHandled).toBe(true);
            });
            it("should not switch selection to previous question if exit handler returns false", function() {
                secondQuestion.isSelected = true;
                spyOn(secondQuestion, 'isValid').and.returnValue(true);
                spyOn(secondQuestion, 'onExit').and.returnValue(false);
                spyOn(firstQuestion, 'toggleSelection');
                spyOn(secondQuestion, 'toggleSelection')

                questionsHandler = new QuestionsHandler([firstQuestion, secondQuestion], prevButton);
                var wasHandled = questionsHandler.prevQuestion();

                expect(secondQuestion.onExit).toHaveBeenCalled();
                expect(secondQuestion.toggleSelection).not.toHaveBeenCalled();
                expect(firstQuestion.toggleSelection).not.toHaveBeenCalled();
                expect(wasHandled).toBe(true);
            });
            it("should switch selection to previous question within different section", function() {
                secondQuestion.isSelected = true;
                spyOn(firstQuestion, 'isDisabled').and.returnValue(false);
                spyOn(secondQuestion, 'isValid').and.returnValue(true);
                spyOn(secondQuestion, 'onExit').and.returnValue(true);
                spyOn(firstQuestion, 'toggleSelection');
                spyOn(secondQuestion, 'toggleSelection')

                var firstSection = jasmine.createSpyObj('firstSection', ['toggleSelection']);
                var secondSection = jasmine.createSpyObj('secondSection', ['toggleSelection']);
                firstSection.questions = [firstQuestion];
                secondSection.questions = [secondQuestion];

                firstQuestion.parentSection = firstSection;
                secondQuestion.parentSection = secondSection;

                questionsHandler = new QuestionsHandler([firstQuestion, secondQuestion], prevButton);
                var wasHandled = questionsHandler.prevQuestion();

                expect(secondQuestion.onExit).toHaveBeenCalled();
                expect(firstQuestion.toggleSelection).toHaveBeenCalled();
                expect(secondQuestion.toggleSelection).toHaveBeenCalled();
                expect(firstSection.toggleSelection).toHaveBeenCalled();
                expect(secondSection.toggleSelection).toHaveBeenCalled();
                expect(wasHandled).toBe(true);
            });
            it("should skip disabled question when navigating forward", function() {
                firstQuestion.isSelected = true;
                spyOn(firstQuestion, 'isValid').and.returnValue(true);
                spyOn(firstQuestion, 'onExit').and.returnValue(true);
                spyOn(secondQuestion, 'isDisabled').and.returnValue(true);
                spyOn(thirdQuestion, 'isDisabled').and.returnValue(false);
                spyOn(firstQuestion, 'toggleSelection');
                spyOn(secondQuestion, 'toggleSelection');
                spyOn(thirdQuestion, 'toggleSelection');

                questionsHandler = new QuestionsHandler([firstQuestion, secondQuestion, thirdQuestion], prevButton);
                var wasHandled = questionsHandler.nextQuestion();

                expect(firstQuestion.onExit).toHaveBeenCalled();
                expect(firstQuestion.toggleSelection).toHaveBeenCalled();
                expect(secondQuestion.toggleSelection).not.toHaveBeenCalled();
                expect(thirdQuestion.toggleSelection).toHaveBeenCalled();
                expect(wasHandled).toBe(true);
            });
            it("should skip disabled question when navigating backwards", function() {
                thirdQuestion.isSelected = true;
                spyOn(thirdQuestion, 'isValid').and.returnValue(true);
                spyOn(thirdQuestion, 'onExit').and.returnValue(true);
                spyOn(secondQuestion, 'isDisabled').and.returnValue(true);
                spyOn(firstQuestion, 'isDisabled').and.returnValue(false);
                spyOn(firstQuestion, 'toggleSelection');
                spyOn(secondQuestion, 'toggleSelection');
                spyOn(thirdQuestion, 'toggleSelection');

                questionsHandler = new QuestionsHandler([firstQuestion, secondQuestion, thirdQuestion], prevButton);
                var wasHandled = questionsHandler.prevQuestion();

                expect(thirdQuestion.onExit).toHaveBeenCalled();
                expect(thirdQuestion.toggleSelection).toHaveBeenCalled();
                expect(secondQuestion.toggleSelection).not.toHaveBeenCalled();
                expect(firstQuestion.toggleSelection).toHaveBeenCalled();
                expect(wasHandled).toBe(true);
            });
            it("should stay on current question if no further enabled questions", function() {
                firstQuestion.isSelected = true;
                spyOn(firstQuestion, 'isValid').and.returnValue(true);
                spyOn(firstQuestion, 'onExit').and.returnValue(true);
                spyOn(secondQuestion, 'isDisabled').and.returnValue(true);
                spyOn(thirdQuestion, 'isDisabled').and.returnValue(true);
                spyOn(firstQuestion, 'toggleSelection');
                spyOn(secondQuestion, 'toggleSelection');
                spyOn(thirdQuestion, 'toggleSelection');

                questionsHandler = new QuestionsHandler([firstQuestion, secondQuestion, thirdQuestion], prevButton);
                var wasHandled = questionsHandler.nextQuestion();

                expect(firstQuestion.isSelected).toBe(true);
                expect(secondQuestion.toggleSelection).not.toHaveBeenCalled();
                expect(thirdQuestion.toggleSelection).not.toHaveBeenCalled();
                expect(wasHandled).toBe(true);
            });
            it("should stay on current question if no prior enabled questions", function() {
                thirdQuestion.isSelected = true;
                spyOn(thirdQuestion, 'isValid').and.returnValue(true);
                spyOn(thirdQuestion, 'onExit').and.returnValue(true);
                spyOn(firstQuestion, 'isDisabled').and.returnValue(true);
                spyOn(secondQuestion, 'isDisabled').and.returnValue(true);
                spyOn(firstQuestion, 'toggleSelection');
                spyOn(secondQuestion, 'toggleSelection');
                spyOn(thirdQuestion, 'toggleSelection');

                questionsHandler = new QuestionsHandler([firstQuestion, secondQuestion, thirdQuestion], prevButton);
                var wasHandled = questionsHandler.prevQuestion();

                expect(thirdQuestion.isSelected).toBe(true);
                expect(firstQuestion.toggleSelection).not.toHaveBeenCalled();
                expect(secondQuestion.toggleSelection).not.toHaveBeenCalled();
                expect(wasHandled).toBe(true);
            });

          it("should show previous button when jumping from first question to second question", function() {
            firstQuestion.isSelected = true;
            spyOn(firstQuestion, 'isValid').and.returnValue(true);
            spyOn(firstQuestion, 'onExit').and.returnValue(true);
            spyOn(secondQuestion, 'isDisabled').and.returnValue(false);
            spyOn(firstQuestion, 'toggleSelection');
            spyOn(secondQuestion, 'toggleSelection');

            questionsHandler = new QuestionsHandler([firstQuestion, secondQuestion], prevButton);
            var wasHandled = questionsHandler.nextQuestion();
            expect(prevButton.hide).not.toHaveBeenCalled();
            expect(prevButton.show).toHaveBeenCalled();
          });


          it("should hide previous button when jumping from second question to first question", function() {
            secondQuestion.isSelected = true;
            spyOn(secondQuestion, 'isValid').and.returnValue(true);
            spyOn(secondQuestion, 'onExit').and.returnValue(true);
            spyOn(firstQuestion, 'isDisabled').and.returnValue(false);
            spyOn(firstQuestion, 'toggleSelection');
            spyOn(secondQuestion, 'toggleSelection');

            questionsHandler = new QuestionsHandler([firstQuestion, secondQuestion], prevButton);
            var wasHandled = questionsHandler.prevQuestion();
            expect(prevButton.hide).toHaveBeenCalled();
            expect(prevButton.show).not.toHaveBeenCalled();
          });

          it("should not hide or show previous button when jumping from second question to third question", function() {
            secondQuestion.isSelected = true;
            spyOn(secondQuestion, 'isValid').and.returnValue(true);
            spyOn(secondQuestion, 'onExit').and.returnValue(true);
            spyOn(thirdQuestion, 'isDisabled').and.returnValue(false);
            spyOn(thirdQuestion, 'toggleSelection');
            spyOn(secondQuestion, 'toggleSelection');

            questionsHandler = new QuestionsHandler([firstQuestion, secondQuestion], prevButton);
            expect(prevButton.hide).not.toHaveBeenCalled();
            expect(prevButton.show).not.toHaveBeenCalled();
          });

          it("should not hide or show previous button when jumping from third question to second question", function() {
            thirdQuestion.isSelected = true;
            spyOn(thirdQuestion, 'isValid').and.returnValue(true);
            spyOn(thirdQuestion, 'onExit').and.returnValue(true);
            spyOn(secondQuestion, 'isDisabled').and.returnValue(false);
            spyOn(secondQuestion, 'toggleSelection');
            spyOn(thirdQuestion, 'toggleSelection');

            questionsHandler = new QuestionsHandler([firstQuestion, secondQuestion], prevButton);
            expect(prevButton.hide).not.toHaveBeenCalled();
            expect(prevButton.show).not.toHaveBeenCalled();
          });

        });
    });

    describe("Mouse handlers", function() {

        describe("Section mouse handlers", function() {
            var sectionsMouseHandler, firstSection, secondSection, thirdSection, question, field, event, sections;
            beforeEach(function() {
                firstSection = {isSelected: false, toggleSelection: '', isValid: '', firstInvalidQuestion: '', onExit:'', title: $('<li></li>')};
                secondSection = {isSelected: false, toggleSelection: '', isValid: '', onExit:'', title: $('<li></li>'), firstInvalidQuestion: ''};
                thirdSection = {isSelected: false, toggleSelection: '', isValid: '', title: $('<li></li>')};
                event = {stopPropagation: ''};

                field = {isSelected: true, toggleSelection: '', select: '', isValid: ''};
                question = {fields: [field], toggleSelection: '', isSelected: true, firstInvalidField: ''};

                sections = [firstSection, secondSection, thirdSection];
            });

            it("should switch selection to section ahead if current section is valid", function() {
                spyOn(event, 'stopPropagation');
                spyOn(firstSection, 'isValid').and.returnValue(true);
                spyOn(firstSection, 'onExit').and.returnValue(true);
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
                spyOn(firstSection, 'isValid').and.returnValue(false);
                spyOn(firstSection, 'onExit').and.returnValue(true);
                spyOn(firstSection, 'toggleSelection');
                spyOn(question, 'toggleSelection');
                spyOn(firstSection, 'firstInvalidQuestion').and.returnValue(question);
                spyOn(question, 'firstInvalidField').and.returnValue(field);
                spyOn(field, 'isValid').and.returnValue(false);
                spyOn(field, 'toggleSelection');
                spyOn(field, 'select');

                firstSection.isSelected = true;
                firstSection.questions = [question];

                clickedSectionHandler(sections, secondSection, event);

                expect(firstSection.onExit).toHaveBeenCalled();
                expect(event.stopPropagation).toHaveBeenCalled();
                expect(field.select).not.toHaveBeenCalled();
            });
            it("should not switch selection to section ahead if exit handler returns false", function() {
                spyOn(event, 'stopPropagation');
                spyOn(firstSection, 'isValid').and.returnValue(true);
                spyOn(firstSection, 'onExit').and.returnValue(false);
                spyOn(field, 'select');
                firstSection.isSelected = true;
                firstSection.questions = [question];

                clickedSectionHandler(sections, secondSection, event);

                expect(firstSection.onExit).toHaveBeenCalled();
                expect(event.stopPropagation).toHaveBeenCalled();
                expect(field.select).toHaveBeenCalled();
            });
            it("should not go past an invalid section when trying to select a section ahead", function() {
                spyOn(event, 'stopPropagation');
                spyOn(firstSection, 'isValid').and.returnValue(true);
                spyOn(firstSection, 'onExit').and.returnValue(true);
                spyOn(firstSection, 'toggleSelection');
                spyOn(secondSection, 'isValid').and.returnValue(false);
                spyOn(secondSection, 'onExit');
                spyOn(secondSection, 'toggleSelection');
                spyOn(secondSection, 'firstInvalidQuestion').and.returnValue(question);
                spyOn(question, 'toggleSelection');
                spyOn(question, 'firstInvalidField').and.returnValue(field);
                spyOn(field, 'toggleSelection');
                spyOn(field, 'isValid');
                firstSection.isSelected = true;
                secondSection.questions = [question];
                question.fields = [field];

                clickedSectionHandler(sections, thirdSection, event);

                expect(event.stopPropagation).toHaveBeenCalled();
                expect(firstSection.onExit).toHaveBeenCalled();
                expect(firstSection.toggleSelection).toHaveBeenCalled();
                expect(secondSection.onExit).not.toHaveBeenCalled();
                expect(secondSection.toggleSelection).toHaveBeenCalled();
                expect(question.toggleSelection).toHaveBeenCalled();
                expect(field.toggleSelection).toHaveBeenCalled();
            });
            it("should switch selection to section ahead but not call exit handler for in between section", function() {
                spyOn(event, 'stopPropagation');
                spyOn(firstSection, 'toggleSelection');
                spyOn(thirdSection, 'toggleSelection');
                spyOn(question, 'toggleSelection');
                spyOn(field, 'toggleSelection');
                spyOn(firstSection, 'isValid').and.returnValue(true);
                spyOn(firstSection, 'onExit').and.returnValue(true);
                spyOn(secondSection, 'isValid').and.returnValue(true);
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
                spyOn(secondSection, 'onExit').and.returnValue(true);
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
                spyOn(secondSection, 'onExit').and.returnValue(false);
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
           var firstQuestion, secondQuestion, thirdQuestion, field, secondField, event, questions;
            beforeEach(function() {
                firstQuestion = {isSelected: false, toggleSelection: '', isValid: '', onExit: '', questionLi: $('<li></li>'), select: ''};
                secondQuestion = {isSelected: false, toggleSelection: '', isValid: '', firstInvalidField: '', onExit: '', questionLi: $('<li></li>')};
                thirdQuestion = {isSelected: false, toggleSelection: '', questionLi: $('<li></li>')};
                event = {stopPropagation: ''};

                field = {isSelected: false, toggleSelection: '', select: ''};
                secondField = { isSelected: false, toggleSelection: '', select: '', isValid: false };

                questions = [firstQuestion, secondQuestion, thirdQuestion];
            });

            it("should switch selection to question ahead if current question is valid", function() {
                spyOn(event, 'stopPropagation');
                spyOn(firstQuestion, 'isValid').and.returnValue(true);
                spyOn(firstQuestion, 'onExit').and.returnValue(true);
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
                spyOn(firstQuestion, 'isValid').and.returnValue(false);
                spyOn(firstQuestion, 'onExit').and.returnValue(true);
                spyOn(field, 'select');
                firstQuestion.isSelected = true;
                field.isSelected = true;
                firstQuestion.fields = [field];

                clickedQuestionHandler(questions, secondQuestion, event);

                expect(firstQuestion.onExit).not.toHaveBeenCalled();
                expect(event.stopPropagation).toHaveBeenCalled();
                expect(field.select).toHaveBeenCalled();
            });
            it("should not switch selection to question ahead but should switch to invalid question in between", function() {
                spyOn(event, 'stopPropagation');
                spyOn(firstQuestion, 'isValid').and.returnValue(true);
                spyOn(firstQuestion, 'onExit').and.returnValue(true);
                spyOn(firstQuestion, 'toggleSelection');
                spyOn(secondQuestion, 'isValid').and.returnValue(false);
                spyOn(secondQuestion, 'toggleSelection');
                spyOn(secondQuestion, 'firstInvalidField');
                spyOn(field, 'select');
                firstQuestion.isSelected=true;
                field.isSelected = true;
                firstQuestion.fields = [field];
                spyOn(secondField, 'select');
                spyOn(secondField, 'toggleSelection');
                spyOn(secondField, 'isValid').and.returnValue(false);
                secondQuestion.fields = [ secondField ];

                clickedQuestionHandler(questions, thirdQuestion, event);

                expect(firstQuestion.onExit).toHaveBeenCalled();
                expect(secondQuestion.toggleSelection).toHaveBeenCalled();
                expect(secondField.toggleSelection).toHaveBeenCalled();
                expect(event.stopPropagation).toHaveBeenCalled();
            });
            it("should switch selection to question ahead but not call exit handler on in-between method", function() {
                spyOn(event, 'stopPropagation');
                spyOn(firstQuestion, 'isValid').and.returnValue(true);
                spyOn(firstQuestion, 'onExit').and.returnValue(true);
                spyOn(secondQuestion, 'isValid').and.returnValue(true);
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
                spyOn(secondQuestion, 'isValid').and.returnValue(true);
                spyOn(secondQuestion, 'onExit').and.returnValue(true);
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
                spyOn(firstQuestion, 'isValid').and.returnValue(true)
                spyOn(firstQuestion, 'onExit').and.returnValue(false);
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
                spyOn(secondQuestion, 'isValid').and.returnValue(true);
                spyOn(secondQuestion, 'onExit').and.returnValue(false);
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
                spyOn(firstField, 'isValid').and.returnValue(true);
                spyOn(firstField, 'onExit').and.returnValue(true);
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
                spyOn(firstField, 'isValid').and.returnValue(false);
                spyOn(firstField, 'onExit').and.returnValue(true);
                spyOn(firstField, 'select');
                spyOn(event, 'preventDefault');
                firstField.isSelected=true;

                clickedFieldHandler(fields, secondField, event);

                expect(firstField.onExit).not.toHaveBeenCalled();
                expect(firstField.select).toHaveBeenCalled();
                expect(event.preventDefault).toHaveBeenCalled();
            });
            it("should not switch selection to field ahead if field in between is not valid", function() {
                spyOn(firstField, 'isValid').and.returnValue(true);
                spyOn(firstField, 'onExit').and.returnValue(true)
                spyOn(secondField, 'isValid').and.returnValue(false);
                spyOn(firstField, 'select');
                spyOn(event, 'preventDefault');
                firstField.isSelected=true;

                clickedFieldHandler(fields, thirdField, event);

                expect(firstField.onExit).not.toHaveBeenCalled();
                expect(firstField.select).toHaveBeenCalled();
                expect(event.preventDefault).toHaveBeenCalled();
            });
            it("should not switch selection to field ahead if exit handler returns false", function() {
                spyOn(firstField, 'isValid').and.returnValue(true);
                spyOn(firstField, 'onExit').and.returnValue(false)
                spyOn(secondField, 'isValid').and.returnValue(true);;
                spyOn(firstField, 'select');
                spyOn(event, 'preventDefault');
                firstField.isSelected=true;

                clickedFieldHandler(fields, thirdField, event);

                expect(firstField.onExit).toHaveBeenCalled();
                expect(firstField.select).toHaveBeenCalled();
                expect(event.preventDefault).toHaveBeenCalled();
            });
            it("should switch selection to field ahead but not call in-between exit handler", function() {
                spyOn(firstField, 'isValid').and.returnValue(true);
                spyOn(firstField, 'onExit').and.returnValue(true);
                spyOn(secondField, 'isValid').and.returnValue(true);
                spyOn(secondField, 'onExit').and.returnValue(true);
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
                spyOn(secondField, 'onExit').and.returnValue(true)
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
                spyOn(secondField, 'onExit').and.returnValue(false);
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
