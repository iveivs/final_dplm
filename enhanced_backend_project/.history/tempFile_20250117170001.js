const mongoUrl = 'mongodb+srv://iveivs1985:SUPERpassword@cluster0.sq9gs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
const bcrypt = require('bcrypt');
const password = "asdasd"; 
const hash = "$2b$10$hMSxJSIKpERhOkimauvL20KtxoWEkDr4fxybzgKJyhBHVMFzGnila"; 
bcrypt.compare(password, hash).then(console.log);