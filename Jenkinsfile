pipeline {
    agent any
    stages {
        stage('Build') { 
            steps {
                sh 'npm install' 
            }
        }
    }
    tools{
        nodejs '21.7.1'
    }
}