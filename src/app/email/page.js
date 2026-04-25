export default function EmailSignature() {
  return (
    <div style={{ fontFamily: "Arial, sans-serif" }}>
      <table cellPadding="0" cellSpacing="0">
        <tbody>
          <tr>
            {/* LOGO */}
            <td style={{ verticalAlign: "top", paddingRight: "15px" }}>
              <img
                src="https://my-agency-omega-two.vercel.app/MashLogowithbackgorund.jpg"
                width="90"
                height="90"
                style={{
                  borderRadius: "50%",
                  objectFit: "cover",
                  border: "2px solid #0a66c2",
                }}
              />
            </td>

            {/* TEXT */}
            <td style={{ verticalAlign: "top" }}>
              {/* NAME */}
              <p style={{ margin: 0, fontSize: "18px", fontWeight: "bold" }}>
                Evan Brooks
              </p>

              {/* ROLE */}
              <p style={{ margin: "2px 0 6px", fontSize: "13px", color: "#555" }}>
                Full Stack Web Developer | WordPress | UI/UX Designer
              </p>

              {/* COMPANY */}
              <p style={{ margin: 0, fontSize: "13px" }}>
                🌐{" "}
                <a
                  href="https://my-agency-omega-two.vercel.app/"
                  style={{  textDecoration: "none" }}
                >
                  WebMashLabs
                </a>
              </p>

              {/* CONTACT */}
              <p style={{ margin: "4px 0", fontSize: "13px" }}>
                📧{" "}
                <a
                  href="mailto:Webmashlabs21@gmail.com"
                  style={{  textDecoration: "none" }}
                >
                  Webmashlabs21@gmail.com
                </a>
                
            
              </p>

              {/* SLOGAN */}
              <p
                style={{
                  marginTop: "6px",
                  fontSize: "13px",
                  fontWeight: "bold",
                  color: "#929090",
                }}
              >
                Design. Develop. Dominate.
              </p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}