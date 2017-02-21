var taskTemplate = '<div class="task">' +
						'<taskInfo task="task">' +
						'<div ng-repeat="(subtaskName, subtask) in task.subtasks" class="subtask-container">' +
							'<taskInfo task="subtask">' +
						'</div>' +
					'</div>';

var taskInfoTemplate = '<div class="task-info">' +
							'<div class="task-icon"></div>' +
							'<div class="task-title"></div>' +
							'<div class="task-time"></div>' +
							'<div class="task-completed-container">' +
								'<input type="checkbox" >' +
							'</div>' +
						'</div>';

angular.module('todo-app', [])
  .controller('mainController', mainController)
  .directive('task', taskDirective)
  .directive('taskInfo', taskInfoDirective);

function mainController($scope) {
	$scope.tasks = {
		'taskName': {
			name: 'taskName',
			subtasks: {
				'subtaskName': {
					name: 'subtaskName',
					time: 5,
					complete: false
				},
				'subtask2Name': {
					name: 'subtask2Name',
					time: 10,
					complete: false
				}
			},
			time: 15,
			complete: false
		},
		'task2Name': {
			name: 'task2Name',
			subtasks: {},
			time: 0,
			complete: false
		}
	};

	$scope.addTask = function() {
		// add task
	}

}

function taskDirective() {

}

function taskInfoDirective() {

}