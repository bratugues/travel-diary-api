export const errorHandler = (err, req, res, next) => {
  if(err.name === "ZodError"){
    return res.status(400).json({
      error: "Invalid input",
      details: err.issues
    })
  } else if (err.code === "P2025" || err.code === "P2002"){
    if (err.code === "P2025"){
      return res.status(404).json({error: "Record not found"})
    } else {
      return res.status(409).json({error: "Unique constraint violation"})
    }
  } else {
    console.error(err)
    return res.status(500).json({error: "Internal server error"})
  }
}
