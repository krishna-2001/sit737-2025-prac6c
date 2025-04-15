# sit737-2025-prac6c
Absolutely! Below is a **fully explained and detailed `README.md` file** tailored for your SIT737 **Task 6.2C – Interacting with Kubernetes** project.

You can copy and paste this into your project as `README.md`.

---

```markdown
# SIT737 Task 6.2C – Interacting with Kubernetes

## 📘 Overview

This project demonstrates how to interact with a deployed Node.js application on a Kubernetes cluster and update the application as part of cloud-native development practices. The task is divided into two parts:

- **Part I**: Interact with the deployed application using `kubectl`, including verifying the app and forwarding traffic to access it locally.
- **Part II**: Update the application by modifying its source code, building a new Docker image, and updating the Kubernetes deployment with the new image version.

---

## 🧰 Tools Used

- **Git** – for version control and GitHub submission  
- **Visual Studio Code** – for writing and editing code  
- **Node.js** – JavaScript runtime for building the app  
- **Docker** – for containerizing the Node.js app  
- **Kubernetes** – for orchestrating and managing containers  
- **kubectl** – CLI tool to manage Kubernetes clusters  

---

## 🛠️ Project Structure

```
sit737-2025-prac6c/
├── Dockerfile
├── index.js
├── package.json
├── deployment.yaml
├── service.yaml
└── README.md
```

---

## ✅ Part I – Interacting with the Deployed Application

### 1. Check Running Resources

Run the following to check if your application pods and services are running:

```bash
kubectl get pods
kubectl get svc
```

Expected output:
```
NAME                                   READY   STATUS    RESTARTS   AGE
node-app-deployment-xxxxx              1/1     Running   0          1m

NAME                 TYPE        CLUSTER-IP       PORT(S)          AGE
node-app-service     NodePort    10.96.154.12     80:30080/TCP     1m
```

---

### 2. Port Forward to Access the App Locally

Use this command to map the Kubernetes service to a local port:

```bash
kubectl port-forward service/node-app-service 8080:80
```

Now visit [http://localhost:8080](http://localhost:8080) in your browser. You should see the output from your Node.js application.

---

## 🆕 Part II – Updating the Application

### 1. Modify `index.js`

Update the message being sent in the response:
```javascript
res.send("Hello from version 2 of the Node.js app!");
```

---

### 2. Rebuild and Push New Docker Image

Rebuild the image with a new version tag and push it to Docker Hub:

```bash
docker build -t krishna820/node-app:v2 .
docker push krishna820/node-app:v2
```

Make sure the `:v2` tag matches what you'll use in your deployment.

---

### 3. Update Kubernetes Deployment

Edit the `deployment.yaml` file to use the new image:
```yaml
containers:
  - name: node-app
    image: krishna820/node-app:v2
```

Then apply the updated deployment:
```bash
kubectl apply -f deployment.yaml
```

---

### 4. Verify the Update

Check that the new pods are running:
```bash
kubectl get pods
```

Port-forward again (if needed):
```bash
kubectl port-forward service/node-app-service 8080:80
```

Now go to [http://localhost:8080](http://localhost:8080) and verify the new message is shown.

---

## 📄 Key Files Explained

### `index.js`
The main Node.js server using Express to respond to requests.

### `package.json`
Lists project dependencies (`express`), version, and start script.

### `Dockerfile`
Defines the container image with instructions to:
- Install dependencies
- Copy files
- Start the Node.js server

### `deployment.yaml`
A Kubernetes deployment that:
- Runs 2 replicas of the Node.js container
- Uses a specific image version
- Exposes port 3000 in the container

### `service.yaml`
Creates a Kubernetes service of type `NodePort` that:
- Maps external traffic (port 30080) to the app's internal port (3000)
- Allows access via `localhost:30080` or port-forwarded `localhost:8080`


## 👨‍🎓 Author Info

**Name**: Kolli Krishna Kumar  
**Student ID**: 223246731  
**Unit**: SIT737 – Cloud Native Application Development  
**Task**: 6.2C – Interacting with Kubernetes


