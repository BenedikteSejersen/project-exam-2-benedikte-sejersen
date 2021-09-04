// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  res.status(200).json({
    succes: {
      heading: "Yes, message is sent!",
      bodyText: "Thank you for your message.  We will be answering you as fast as possible.",
      btnText: "Continue"
    },
    error: {
      heading: "Oh no! Something went wrong",
      bodyText: "Unfortunately, your message did not arrive.",
      btnText: "Try again"
    },
    delete: {
      heading: "Are you sure you want to delete?",
      bodyText: "Once you delete this, that is long gone. Forever ever.",
      btnText: "Delete",
      btnText_2: "No, I changed my mind"
    }
    
   })
}
