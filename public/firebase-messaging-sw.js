importScripts('https://www.gstatic.com/firebasejs/7.6.1/firebase-app.js'); 
importScripts('https://www.gstatic.com/firebasejs/7.6.1/firebase-messaging.js'); 

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

//self.addEventListener

messaging.setBackgroundMessageHandler(function(payload) { 
	console.log('[firebase-messaging-sw.js] onBackgroundMessage ', payload)
	console.log(payload.notification)
	const title = "테스트하는중!"; 
	const options = { 
		body: payload.notification.body
	}; 
	return self.registration.showNotification(title,options); 
});