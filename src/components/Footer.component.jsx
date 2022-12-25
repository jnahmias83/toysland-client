const FooterComponent = () => {
  const getYear = () => {
    return new Date().getFullYear();
  };

  return (
    <>
      <div className="text-light bg-dark p-2 w-100">
        <div className="row">
          <div className="col-12 text-center">
            <a href="https://www.facebook.com/toysland.lk/" target="_blank" rel="noreferrer">
              <i
                className="fa-brands fa-facebook-f m-3"
                style={{ fontSize: "35px" }}
                title="Facebook"
              ></i>
            </a>
            <a
              href="https://api.whatsapp.com/send?phone=00972546830914"
              target="_blank"
              rel="noreferrer"
            >
              <i className="fa-brands fa-whatsapp m-3" title="WhatsApp"></i>
            </a>
            <a
              href="https://www.instagram.com/toyland.official/?hl=en"
              target="_blank"
              rel="noreferrer"
            >
              <i className="fa-brands fa-instagram m-3" title="Instagram"></i>
            </a>
            <a href="https://twitter.com/toysland1" target="_blank" rel="noreferrer">
              <i className="fa-brands fa-twitter m-3" title="Twitter"></i>
            </a>
            <a href="https://t.me/00972546830914" target="_blank" rel="noreferrer">
              <i className="fa-brands fa-telegram m-3" title="Telegram"></i>
            </a>
            <a href="mailto:jnahmias83@gmail.com" target="_blank" rel="noreferrer">
              <i className="fa-regular fa-envelope m-3" title="Email"></i>
            </a>
          </div>
        </div>
        <div className="row">
          <div className="col-12 text-center">
            © Yonathan Nahmias {getYear()} - all right reserved
          </div>
        </div>
      </div>
    </>
  );
};
export default FooterComponent;
