const NewsLetter = () => {
  return (
    <section className="theme-bg py-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-4 col-md-12">
            <h2 className="title">
              News<span>letter</span>
            </h2>
          </div>
          <div className="col-lg-8 col-md-12 md-mt-3">
            <div className="subscribe-form">
              <form id="mc-form" className="group row align-items-center">
                <div className="col-sm-8">
                  <input
                    type="email"
                    defaultValue=""
                    name="EMAIL"
                    className="email box-shadow"
                    id="mc-email"
                    placeholder="Email Address"
                    required=""
                  />
                </div>
                <div className="col-sm-4 xs-mt-1">
                  <input
                    className="btn btn-white"
                    type="submit"
                    name="subscribe"
                    defaultValue="Subscribe"
                  />
                </div>
                <label htmlFor="mc-email" className="subscribe-message" />
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsLetter;
