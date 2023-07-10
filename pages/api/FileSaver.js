
export default function handler(req, res) {
    const {base64}=req.body;
    console.log(base64);
    res.status(200).json({
        status:"ok",
        base64:base64
    });
    //res.status(200).json({ name: 'John Doe' })
}
  