pipeline {
  agent any

  tools {
    nodejs "Node 18" // You can set this under "Global Tools Configuration"
  }

  stages {
    stage('Checkout') {
      steps {
        git 'https://github.com/adityachaubey265/Tic-tac-toe.git' // or use local repo
      }
    }

    stage('Install Dependencies') {
      steps {
        sh 'npm install'
      }
    }

    stage('Build') {
      steps {
        sh 'npm run build'
      }
    }

    stage('Docker Build') {
      steps {
        script {
          docker.build("tic-tac-toe")
        }
      }
    }

    // Optional: Push to Docker Hub
    // stage('Docker Push') {
    //   steps {
    //     withDockerRegistry([credentialsId: 'dockerhub-creds']) {
    //       sh 'docker tag tic-tac-toe your-dockerhub-user/tic-tac-toe'
    //       sh 'docker push your-dockerhub-user/tic-tac-toe'
    //     }
    //   }
    // }
  }

  post {
    success {
      echo 'Build completed successfully!'
    }
    failure {
      echo 'Build failed.'
    }
  }
}
