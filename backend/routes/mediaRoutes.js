import express from "express";
import multer from "multer";
import { deleteHelper, uploadHelper } from "../helpers/cloudinary.js";

const router = express.Router();

const upload = multer({ dest: "uploads/" });

router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    const result = await uploadHelper(req?.file?.path);
    //    console.log("result",result)
    if (result) {
      res.status(200).json({
        success: true,
        media: result,
        message: "file uploaded successfully!",
      });
    }
  } catch (error) {
    res
      .status(404)
      .json({ success: false, message: "cannot upload file!" + error.message });
  }
});
router.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(404).json({
        success: false,
        message: "no provided id , cannot upload file!",
      });
    }

    await deleteHelper(id);

    res
      .status(200)
      .json({ success: true, message: "file deleted successfully!" });
  } catch (error) {
    res.status(404).json({ success: false, message: "cannot delete file!" });
  }
});

export default router;
