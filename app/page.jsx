import Feed from "@components/Feed";

const Home = () => (
  <section className='w-full flex-center flex-col'>
    <h1 className='head_text text-center'>
      Discover & Enjoy
      <br className='max-md:hidden' />
      <span className='orange_gradient text-center'> Share Your Article</span>
    </h1>
    <p className='desc text-center'>
      This is best article resource share platform with world. </p>

    <Feed />
  </section>
);

export default Home;