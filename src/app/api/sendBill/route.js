import { NextResponse } from "next/server";
import twilio from "twilio";

const client = twilio(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
);

export async function POST(req) {
  try {
    const { phoneNumber, billDetails } = await req.json();

    const message = await client.messages.create({
      body: `🧾 Bill from ShopManager:\n${billDetails}`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: `+91${phoneNumber}`, // E.164 format, e.g. +91XXXXXXXXXX
    });

    return NextResponse.json({ success: true, sid: message.sid });
  } catch (err) {
    console.log(err)
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}






// import { NextResponse } from "next/server";

// export async function POST(req) {
//   try {
//     const { phoneNumber, billDetails } = await req.json();

//     const MSG91_AUTH_KEY = process.env.MSG91_AUTH_KEY;
//     const TEMPLATE_ID = "your_template_id_here"; // Replace with actual template ID from MSG91

//     const smsPayload = {
//       template_id: '67f11dcdd6fc0548bd290403',
//       short_url: "0",
//       recipients: [
//         {
//           mobiles: `91${phoneNumber}`, // format: 919XXXXXXXXX
//           VAR1: billDetails,    // Replace VAR1 with your actual variable name in the template
//         },
//       ],
//     };

//     const response = await fetch("https://control.msg91.com/api/v5/flow", {
//       method: "POST",
//       headers: {
//         authkey: MSG91_AUTH_KEY,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(smsPayload),
//     });

//     const data = await response.json();

//     if (data.type === "success") {
//       return NextResponse.json({ success: true, data });
//     } else {
//       return NextResponse.json({ success: false, error: data }, { status: 500 });
//     }

//   } catch (err) {
//     return NextResponse.json({ success: false, error: err.message }, { status: 500 });
//   }
// }
