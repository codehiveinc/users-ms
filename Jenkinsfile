pipeline {
  agent any

  environment {
    DOCKERIMAGE = 'pipeline-users-ms'
    HOME = '.'
  }

  stages {
    stage('Build') {
      steps {
        script {
          docker.build(DOCKERIMAGE, "--build-arg PORT=3000 -p 3000:3000")
        }
      }
    }
  }
}
