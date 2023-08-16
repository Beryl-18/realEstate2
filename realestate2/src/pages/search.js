import { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import {Flex, Box, Text, Icon} from "@chakra-ui/react"
import { BsFilter } from "react-icons/bs";
import SearchFilters from "../../components/SearchFilters";
import Property from "../../components/Property";
import noresults from "../../assets/images/noresult.svg";
import { baseUrl, fetchApi } from "../../utils/fetchApi";


const Search = ({properties}) => {
    const [searchFilters, setSearchFilters] = useState(false);
    const router = useRouter();

    return (
        <Box>
            <Flex
                cursor="pointer"
                background="gray.100"
                borderBottom="1px"
                borderColor="gray.200"
                p="2"
                fontWeight="black"
                fontSize="large"
                justifyContent="center"
                alignItems="center"
                onClick={() => setSearchFilters((prevFilter) => !prevFilter)}
            >
                <Text> Search Property by Filters</Text>
                <Icon paddingLeft="2" w="7" as={BsFilter} />
            </Flex>
            {searchFilters && <SearchFilters />}
            <Text fontSize="2xl" p="4" fontWeight="bold">
                Properties {router.query.purpose}
            </Text>
            <Flex flexWrap="wrap">
                {properties.map((property) => <Property property={property} key={property.id} />)}
            </Flex>
            {properties.length === 0 && (
                <Flex justifyContent="center" alignItems="center" flexDirection="column" marginTop="5" marginBottom="5">
                    <Image alt="No Result" src={noresults} />
                    <Text fontSize="2xl" marginTop="3"> No Results Found </Text>
                </Flex>
            )}
        </Box>
    )
}

export async function getServerSideProps({query}){
    const purpose = query.purpose || 'for-rent';
    const rentFreq = query.rentFreq || 'yearly';
    const minPrice = query.minPrice || '0';
    const maxPrice = query.maxPrice || '1000000';
    const roomsMin = query.roomsMin || '0';
    const bathsMin = query.bathsMin || '0';
    const sort = query.sort || 'price-desc';
    const areaMax = query.areaMax || '35000';
    const locationExternalIDs = query.locationExternalIDs || '5002';
    const categoryExternalID = query.categoryExternalID || '4';

    const data = await fetchApi(`${baseUrl}/properties/list?locationExternalIDs=${locationExternalIDs}&purpose=${purpose}&rentFreq=${rentFreq}&minPrice=${minPrice}&maxPrice=${maxPrice}&roomsMin=${roomsMin}&bathsMin=${bathsMin}&sort=${sort}&areaMax=${areaMax}&categoryExternalID=${categoryExternalID}`) 

    return {
      props : {
        properties: data?.hits
      }
    }
}

export default Search;