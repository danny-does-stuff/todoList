var taskTemplate = `
	<div class="task">
		<div class='task-info' style="display:inline-block; vertical-align:middle">
			<span class='title'>{{task.name}}</span> {{sumTime(task)}} min
            <input type="button" class={{task.name}}  id="addNew" value="+" ng-click="Show(task.name)" style="font-family: CovesBold; font-size: 25px;"/>
		</div>
		<div class='subtasks'>
			<div ng-repeat="subtask in task.subtasks" class="subtask-container">
				<sub-task subtask="subtask" parent="task" />
			</div>
            <div id={{task.name}} style="display:none;">
				<form>
					Title: <input type='text' ng-model='task.newSubtaskName'>
					Time: <input type='text' class='time-input' ng-model='task.newSubtaskTime'>
					<button type='submit' ng-click='addSubTask(task)'>Add</button>
				</form>
			</div>
		</div>
	</div>
`;

var subTaskTemplate = `
	<div class="subtask">
		<div class="task-info">
			<div class="task-icon"></div>
			<span class="title">{{subtask.name}}</span> {{subtask.time}} min
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
			name: 'Clean Room',
			subtasks: [
				{
					name: 'Make Bed',
					time: 5,
					complete: false
				},
				{
					name: 'Clean Closet',
					time: 10,
					complete: true
				}
			],
			time: 15,
			complete: false
		},
		{
			name: 'Clean Kitchen',
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

	$scope.addTask = function() {
		$scope.tasks.push({name: $scope.newTaskName, time: 0, subtasks: [], complete: false});
		$scope.newTaskName = '';
	}

	$scope.addSubTask = function(task) {
		debugger;
		task.subtasks.push({name: task.newSubtaskName, time: parseInt(task.newSubtaskTime), complete: false});
		task.newSubtaskName = '';
		task.newSubtaskTime = '';
	}

    $scope.IsVisible = false;
    $scope.ShowHide = function () {
        //If DIV is visible it will be hidden and vice versa.
        $scope.IsVisible = $scope.IsVisible ? false : true;
    }

    $scope.Show = function (task) {
        console.log(task)
        var x = document.getElementById(task);
        if (x.style.display === 'none') {
            x.style.display = 'block';
        } else {
            x.style.display = 'none';
        }
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
                if (allDone == true) {
                    console.log("All Done")
                    console.log(scope.parent.name)
                    var x = document.getElementsByClassName(scope.parent.name)["addNew"];
                    console.log(x)
                    x.style.display = "none";
                }
			}
		}
	}
}

function myFunction(task) {
    var x = document.getElementById(task);
    if (x.style.display === 'none') {
        x.style.display = 'block';
    } else {
        x.style.display = 'none';
    }
}
