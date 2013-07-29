var selectedModel = function(items) {
    return _.find(items, function(i) { return i.isSelected; });
}

function FieldsKeyboardHandler(fieldModels, questionsHandler) {
    var fields = fieldModels;
    var questionsHandler = questionsHandler;

    var delegateIfNoSelectedFieldTo = function(delegatedFunction) {
        if(!selectedModel(fields)) {
            return delegatedFunction();
        }
        return false;
    }
    var switchActiveQuestions = function(previousFieldParentQuestion, currentFieldParentQuestion) {
        if(previousFieldParentQuestion != currentFieldParentQuestion && previousFieldParentQuestion.isValid()) {
            previousFieldParentQuestion.toggleSelection();
            if(previousFieldParentQuestion.parentSection != currentFieldParentQuestion.parentSection) {
                previousFieldParentQuestion.parentSection.toggleSelection();
                currentFieldParentQuestion.parentSection.toggleSelection();
            }
            currentFieldParentQuestion.toggleSelection();
        }
    };
    var switchActiveField = function(fieldIndexUpdater, showFirstFieldIfNoneIsActive) {
        var currentIndex;
        var newField = null;
        while (newField == null || newField.isDisabled()) {
            var field = selectedModel(fields);
            if(field) {
                if (field.onExit()) {   // call any exit handler, and only continue if it returns true
                    currentIndex = _.indexOf(fields, field);
                    var nextIndex = fieldIndexUpdater(currentIndex);
                    newField = fields[nextIndex];

                    if(newField) {
                        if (field.parentQuestion != newField.parentQuestion) {
                             if (!field.parentQuestion.isValid()) {
                                 return false;
                             }
                        }

                        field.toggleSelection();
                        switchActiveQuestions(field.parentQuestion, newField.parentQuestion);
                        newField.toggleSelection();
                    } else {
                        return true;
                    }
                } else {
                    return false;
                }
            } else {
                if(showFirstFieldIfNoneIsActive) {
                    questionsHandler.selectedQuestion() || questionsHandler.handleDownKey();
                    questionsHandler.selectedQuestion().fields[0].toggleSelection();
                    return true;
                }
            }
        }

        return newField != null;
    };


    var api = {};
    api.handleUpKey = function() {
        return delegateIfNoSelectedFieldTo(questionsHandler.handleUpKey);
    };
    api.handleDownKey = function() {
        return delegateIfNoSelectedFieldTo(questionsHandler.handleDownKey);
    };
    api.handleTabKey = function() {
        var currentField = selectedModel(fields);
        var isValid = (currentField ? currentField.isValid() : true);
        var activeFieldSwitched = (isValid ? switchActiveField(function(i) { return i+1; }, true) : false);
        if (!activeFieldSwitched) { currentField.select(); }
        return true;
    };
    api.handleShiftTabKey = function() {
        return switchActiveField(function(i) { return i-1; }, false);
    };
    api.handleEnterKey = function() {
        var currentField = selectedModel(fields);
        var fieldType = currentField.element.attr("type");
        if(fieldType && fieldType.match(/submit|button/)) {
            currentField.element.click();
        } else {
            api.handleTabKey();
        }
    };
    api.handleEscKey = function() {
        var field = selectedModel(fields);
        if(field) {
            field.toggleSelection();
            return true;
        }
        return false;
    };
    return api;
}

function QuestionsKeyboardHandler(questionModels) {
    var questions = questionModels;

    var api = {};
    api.selectedQuestion = function() {
        return selectedModel(questions);
    };
    api.handleUpKey = function() {
        var question = selectedModel(questions);
        if(question) {
            if (!question.onExit()) {   // run any exit handler, and don't proceed if it returns false
                return true;
            }
            var idx = _.indexOf(questions, question);
            if(idx > 0) {
                question.toggleSelection();
                questions[idx-1].toggleSelection();
                if(question.parentSection != questions[idx-1].parentSection) {
                    question.parentSection.toggleSelection();
                    questions[idx-1].parentSection.toggleSelection();
                }
                return true;
            }
        }
        return false;
    };
    api.handleDownKey = function() {
        var question = selectedModel(questions);
        if(!question) {
            questions[0].toggleSelection();
            questions[0].parentSection.toggleSelection();
            return true;
        }

        if(!question.isValid() || !question.onExit()) {   // run the validation, if it passes, run the exit handlers; if either returns false, don't proceed
            return true;
        }
        var idx = _.indexOf(questions, question);
        if(idx < questions.length-1) {
            question.toggleSelection();
            questions[idx+1].toggleSelection();
            if(question.parentSection != questions[idx+1].parentSection) {
                question.parentSection.toggleSelection();
                questions[idx+1].parentSection.toggleSelection();
            }
            return true;
        }
        return false;
    };
    return api;
}

var sectionsMouseHandlerInitializer = function(sections) {
    _.each(sections, function(section) {
        section.title.click( function(event) {
            clickedSectionHandler(sections, section, event);
        });
    });
};
var clickedSectionHandler = function(sections, section, event) {
    event.stopPropagation();
    var currentSection = selectedModel(sections);
    if(currentSection == section) {
        return;
    }

    var currentSectionIndex = _.indexOf(sections, currentSection);
    var clickedSectionIndex = _.indexOf(sections, section);
    var shouldSelectClickedSection = true;
    if(clickedSectionIndex > currentSectionIndex) {
        for(var i=currentSectionIndex; i<clickedSectionIndex; i++) {
            shouldSelectClickedSection = sections[i].isValid() && shouldSelectClickedSection;
        }
    }

    // call exit handler if validation has passed
    shouldSelectClickedSection = shouldSelectClickedSection && currentSection.onExit();

    if(!shouldSelectClickedSection) {
        var selectedQuestion = selectedModel(currentSection.questions);
        var selectedField = selectedModel(selectedQuestion.fields);
        selectedField && selectedField.select();
    } else {
        currentSection.toggleSelection();
        section.toggleSelection();
        section.questions[0].toggleSelection();
        section.questions[0].fields[0].toggleSelection();
    }
};

var questionsMouseHandlerInitializer = function(questions) {
    _.each(questions, function(question) {
        if(question.questionLi) {
            question.questionLi.click(function(event) {
                clickedQuestionHandler(questions, question, event);
            });
        }
    });
};
var clickedQuestionHandler = function(questions, question, event) {
    event.stopPropagation();
    var currentQuestion = selectedModel(questions);
    if(currentQuestion == question) {
        return;
    }

    var currentQuestionIndex = _.indexOf(questions, currentQuestion);
    var clickedQuestionIndex = _.indexOf(questions, question);
    var shouldSelectClickedQuestion = true;
    if(clickedQuestionIndex > currentQuestionIndex) {
        for(var i=currentQuestionIndex; i<clickedQuestionIndex; i++) {
            shouldSelectClickedQuestion = questions[i].isValid() && shouldSelectClickedQuestion;
        }
    }

    // call exit handler if validation has passed
    shouldSelectClickedQuestion = shouldSelectClickedQuestion && currentQuestion.onExit();

    if(!shouldSelectClickedQuestion) {
        var selectedField = selectedModel(currentQuestion.fields);
        selectedField && selectedField.select();
    } else {
        currentQuestion.toggleSelection();
        question.toggleSelection();
        question.fields[0].toggleSelection();
    }
};



var fieldsMouseHandlerInitializer = function(fields) {
    _.each(fields, function(field) {
        field.element.mousedown(function(event) {
            clickedFieldHandler(fields, field, event);
        });
    });
};
var clickedFieldHandler = function(fields, field, event) {
    var currentField = selectedModel(fields);
    if(currentField == field) {
        currentField.select();
        return;
    }

    var currentFieldIndex = _.indexOf(fields, currentField);
    var clickedFieldIndex = _.indexOf(fields, field);
    var shouldSelectClickedField = true;
    if(clickedFieldIndex > currentFieldIndex) {
        for(var i=currentFieldIndex; i<clickedFieldIndex; i++) {
            shouldSelectClickedField = fields[i].isValid() && shouldSelectClickedField;
        }
    }

    // call exit handler if validation has passed
    shouldSelectClickedField = shouldSelectClickedField && currentField.onExit();

    if(!shouldSelectClickedField) {
        currentField.select();
    } else {
        currentField.toggleSelection();
        field.toggleSelection();
    }
    event.preventDefault();
};