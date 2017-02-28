var taskTemplate = `
	<div class="task">
		<h3>{{task.name}}</h3>
		Time Remaining: {{sumTime(task)}}
		<div ng-repeat="subtask in task.subtasks" class="subtask-container">
			<sub-task subtask="subtask" parent="task" />
		</div>
		<div>
			Name: <input type='text' ng-model='task.newTaskName'>
			Time: <input type='text' ng-model='task.newTaskTime'>
			<button ng-click='addSubTask(task, task.newTaskName, task.newTaskTime)'>Add</button>
		</div>
	</div>
`;

var subTaskTemplate = `
	<div class="task-info subtask">
		<div class="task-icon"></div>
		<div class="task-title">{{subtask.name}}</div>
		<div class="task-time">{{subtask.time}}</div>
		<div class="task-completed-container">
			<input type="checkbox" ng-model='subtask.complete' ng-change='updateParent()'>
		</div>
	</div>
`;

angular.module('todo-app', [])
  .controller('mainController', mainController)
	.directive('subTask', subTaskDirective)
  .directive('task', taskDirective);

function mainController($scope) {
	$scope.tasks = [
		{
			name: 'taskName',
			subtasks: [
				{
					name: 'subtaskName',
					time: 5,
					complete: false
				},
				{
					name: 'subtask2Name',
					time: 10,
					complete: true
				}
			],
			time: 15,
			complete: false
		},
		{
			name: 'task2Name',
			subtasks: [],
			time: 0,
			complete: false
		}
	];

	$scope.sumTime = function(task) {
		var time = 0;
		for (var i in task.subtasks) {
			if (!task.subtasks[i].complete) {
				time += task.subtasks[i].time;
			}
		}
		return time;
	}

	$scope.addTask = function(name) {
		$scope.tasks.push({name: name, time: 0, subtasks: [], complete: false});
	}

	$scope.addSubTask = function(task, name, time) {
		task.subtasks.push({name: name, time: parseInt(time), complete: false});
	}

}

function taskDirective() {
	return {
		template: taskTemplate,
		restrict: 'E',
		link: function(scope, element, attrs) {
		}
	}
}

function subTaskDirective() {
	return {
		template: subTaskTemplate,
		scope: { subtask: '=', parent: '=' },
		link: function(scope, element, attrs) {
			scope.updateParent = function() {
				var allDone = true;
				for (var i in scope.parent.subtasks) {
					allDone = scope.parent.subtasks[i].complete ? allDone : false;
				}
				scope.parent.complete = allDone;
			}
		}
	}
}
