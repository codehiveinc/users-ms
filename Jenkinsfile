pipeline {
    agent any

    stages {
        stage('Initialize') {
            steps {
                script {
                    def dockerHome = tool 'myDocker'
                    env.PATH = "${dockerHome}/bin:${env.PATH}"
                    // print the docker location
                    sh 'which docker'
                }
            }
        }

        stage('Clean old containers') {
            steps {
                script {
                    sh 'docker stop users-ms-container || true'
                    sh 'docker rm users-ms-container || true'
                }
            }
        }

        stage('Build and Run Docker') {
            steps {
                script {
                    sh 'docker build -t users-ms .'
                    sh 'docker run -d -p 3000:3000 --name users-ms-container users-ms'
                }
            }
        }
    }
}