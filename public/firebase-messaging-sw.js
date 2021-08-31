importScripts('https://www.gstatic.com/firebasejs/7.8.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.8.0/firebase-messaging.js');
console.log("sw.js 실행됨")
// Initialize Firebase 
var config = { 
	apiKey: "AIzaSyAMiyzuGLBHAk4K18Q4Bla4ljA4cfUf-oM"
	, authDomain: "i4h-hicare.firebaseapp.com"
	, databaseURL: "https://i4h-hicare.firebaseio.com"
	, projectId: "i4h-hicare"
	, storageBucket: "i4h-hicare.appspot.com"
	, messagingSenderId: "575076484827"
	, appId: "1:575076484827:web:b15851500503c4c2432efe" 
	, measurementId: "G-5H09HRTQQT"  
}; 
firebase.initializeApp(config); 

const messaging = firebase.messaging();
//messaging.usePublicVapidKey("BL0eTL3wIbAxmATwORsjQ-pNPCQBYrFNofCAr1xnArzbBjkRDreJLmiXYd-ySpazU-GTEAhtThWIhCLxYLvTGvY");

messaging.setBackgroundMessageHandler(function(payload) {
	const title = "Hello World"; 
	const options = { 
		body: payload.data.status 
	}; 
	return self.registration.showNotification(title,options); 
});


