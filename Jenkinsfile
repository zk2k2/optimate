pipeline {
    agent any
    stages {
        stage('Build') { 
            steps {
                sh 'npm install' 
            }
        }
        stage('Test') { 
          steps{
            sh 'npm test'
          }
        }
        stage('Deploy to Vercel'){
          steps{
           sh 'npm install -g vercel'
           sh 'vercel --token NvDllVAjwuTQmijjCcUa8NBL --prod'
          }
        }
    }
    tools{
        nodejs '21.7.1'
    }
}