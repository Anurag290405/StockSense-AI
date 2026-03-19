const express = require('express');
const router = express.Router();
const multer = require('multer');
const { handleChat, handleCSVUpload } = require('../controllers/chatController');

const upload = multer({ dest: 'uploads/' });

router.post('/chat', handleChat);
router.post('/upload', upload.single('file'), handleCSVUpload);

module.exports = router;
