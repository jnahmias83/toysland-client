import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../store/auth";

const AboutPage = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const jwtPayload = JSON.parse(window.atob(token.split(".")[1]));
    if (jwtPayload.exp <= Date.now() / 1000) {
      localStorage.removeItem("token");
      dispatch(authActions.logout());
      history.push("/login");
    }
  }, []);

  return (
    <>
      <h1 className="my-3">About the Toysland</h1>
      <h3>A bit of knowledge</h3>
      <p className="p-about mt-3">
        The original representation of the Land of Toys mixes the aspects of a
        morality tale with those of social critique.
      </p>
      <p className="p-about">
        Children (depending upon the translation of the original Italian, the
        novel has included both boys and girls or only boys) are lured there by
        the Coachman with the promise of never having to go to school again and
        being able to spend their whole time having fun. They never have to do
        any work or learn anything, and the graffiti on all the walls is proof
        of that.
      </p>
      <p className="p-about">
        The children there were described as playing with nuts, playing with
        battledores, playing with balls, riding velocipedes, riding wooden
        horses, playing hide and seek, and chasing each other. Some were dressed
        in straw were eating lighted tow. Some were doing some reciting. Some
        were singing. Some were walking on their hands. Some were trundling
        hoops. Some were dressed as generals commanding others dressed as
        soldiers. Some were laughing. Some were shouting. Some were calling out.
        Some clapped their hands. Some whistled. Some clucked as if they were
        pretending to be hens laying eggs. In other words, it was pandemonium
        here.
      </p>
      <p className="p-about">
        There were also canvas theaters erected which was crowded by children
        from morning to evening. The walls of some house had messages on them
        that said "Long live playthings, we will have no more schools: down with
        arithmetic". There was also fine sentiments in bad spelling.
      </p>
      <p className="p-about">
        Finally, after months of reckless abandonment, the true purpose of the
        land is revealed. As a result of their immodest behavior and ignorance,
        and what is treated almost as a natural consequence, they become donkeys
        (in Italian culture, the donkey is symbolic of ignorance, stupidity,
        goofiness and labor). Pinocchio learned of the "donkey fever" from a
        marmot.
      </p>

      <h3 className="mt-4 my-1">Let's see ...</h3>
      <div className="row">
        <div className="col-md-4 col-sm-6 col-xs-12 mr-3 mt-3">
          <iframe
            className="video"
            height="300"
            src="https://www.youtube.com/embed/WKMtGlBpRms"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </div>
        <div className="col-md-4 col-sm-6 col-xs-12 mr-3 mt-3">
           <iframe
            className="video"
            height="300"
            src="https://www.youtube.com/embed/V0KOZdrXqys"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </div>
        <div className="col-md-3 col-sm-6 col-xs-12 mr-3 mt-3">
          <iframe
            className="video"
            height="300"
            src="https://www.youtube.com/embed/hJ-Qur8c-YY"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </div>
      </div>
    </>
  );
};

export default AboutPage;
