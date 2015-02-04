'use strict';

app.service('Task',  function(FURL, $firebase, Auth){


	var ref = new Firebase(FURL);
	var tasks = $firebase(ref.child('tasks')).$asArray();
	var user = Auth.user;

	var Task = {
		all: tasks,

		getTask: function(taskId){
			return $firebase(ref.child('tasks').child(taskId));			
		},

		createTask: function(task){
			task.datetime = Firebase.ServerValue.TIMESTAMP;
			console.log(task);
			return tasks.$add(task)			
		},

		editTask: function(task){
			var t = this.getTask(task.$id);
			return t.$update({title:task.title, description:task.description, total:task.total});			
		},

		cancelTask: function(task) {
			var t = this.getTask(taskId);
			return t.$update({status:"canceled"});
		},

		isCreator: function (task) {
			return (user && user.provider && user.uid === task.poster)
		},

		isOpen: function (task) {
			return task.status === "open";
		}				
	};

	return Task;

	
})