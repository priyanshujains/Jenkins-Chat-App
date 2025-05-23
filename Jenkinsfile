pipeline {
    agent { label 'priyanshu' } // Replace with your actual node label

    environment {
        DOCKERHUB_USER = 'priyanshujains'
        IMAGE_FRONTEND = "${DOCKERHUB_USER}/sb"
        IMAGE_BACKEND = "${DOCKERHUB_USER}/fr"
    }

    stages {
        stage('Clone Repo') {
            steps {
                git branch: 'main', url: 'https://github.com/priyanshujains/Jenkins-Chat-App.git'
            }
        }

        stage('Build Frontend Image') {
            steps {
                dir('front-chat') {
                    sh "docker build -t ${IMAGE_FRONTEND}:latest ."
                }
            }
        }

        stage('Build Backend Image') {
            steps {
                dir('chat-app-backend') {
                    sh "docker build -t ${IMAGE_BACKEND}:latest ."
                }
            }
        }

        stage('Push Images to Docker Hub') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub-creds', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                    sh """
                        echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin
                        docker push ${IMAGE_FRONTEND}:latest
                        docker push ${IMAGE_BACKEND}:latest
                        docker logout
                    """
                }
            }
        }

        stage('Deploy using Docker Compose') {
            steps {
                sh "docker-compose down || true"
                sh "docker-compose pull || true"
                sh "docker-compose up -d --build"
            }
        }
    }
}

