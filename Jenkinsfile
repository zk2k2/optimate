pipeline {
    agent any
    stages {
        stage('Build') { 
            steps {
                sh 'npm install' 
            }
        }
        stage('Test') { 
            //no tests so far
        }
        stage('Deploy to Vercel'){
           sh 'npm install -g vercel'
           sh 'vercel --token NvDllVAjwuTQmijjCcUa8NBL --prod'
        }
    }
    tools{
        nodejs '21.7.1'
    }
}