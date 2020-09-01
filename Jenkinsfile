pipeline {
    agent {
        docker {
            image 'node:6-alpine' 
            args '-p 3000:3000' 
        }
    }
    stages {
        stage('Build') { 
            steps {
                sh 'cd /backend && yarn && cd .. && cd frontend && yarn' 
            }
        }
        stage('Test') { 
            steps {
                sh 'cd /backend && yarn && yarn test && cd .. && cd frontend && yarn && yarn test' 
            }
        }
    }
}