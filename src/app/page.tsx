import {CnaeFormRoot} from '../components/form/cnaeFormRoot'

export default function Home() {

  return (
    <>
    <div className="container mx-auto py-10">
      <CnaeFormRoot/>
    </div>
    {/* <div className="container mx-auto py-10">
      <CnaeForm onSubmit={handleSubmit} />
    </div> */} 
    </>
  );
}