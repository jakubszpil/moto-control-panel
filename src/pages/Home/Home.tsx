import { useAppSelector } from "../../app/hooks";
import Map from "../../components/Map/Map";
import Table from "../../components/Table/Table";

export default function Home() {
  const handleDeviceSelect = (item: any) => {
    console.log(item);
  };

  return (
    <>
      <section>
        <Map />
        <Table responsive hover borderless striped />
      </section>
    </>
  );
}
