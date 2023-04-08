import Head from "next/head";
import Map from "../components/Map";
import Header from "../components/Header";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
// YourPage.js
import { fetchAllCountries } from "../src/dataFetcher";

export default function Home({ allCountries }) {
  return (
    <div className="container mx-auto px-4 py-8">
      <Head>
        <title>Visited Countries</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main>
        <Tabs value="countries">
          <TabsHeader>
            <Tab key="countries" value="countries">
              Countries
            </Tab>
            <Tab key="regions" value="regions">
              Regions
            </Tab>
            <Tab key="cities" value="cities">
              Cities
            </Tab>
          </TabsHeader>
          <TabsBody>
            <TabPanel key="countries" value="countries">
              <Map allCountries={allCountries} />
            </TabPanel>
            <TabPanel key="regions" value="regions">
              Regions
            </TabPanel>
            <TabPanel key="cities" value="cities">
              Cities
            </TabPanel>
          </TabsBody>
        </Tabs>
      </main>
    </div>
  );
}

export async function getStaticProps() {
  const allCountries = await fetchAllCountries();

  return {
    props: {
      allCountries,
    },
  };
}
