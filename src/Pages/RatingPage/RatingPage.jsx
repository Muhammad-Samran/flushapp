import { React } from "react";
import TextEditor from "../../Components/global/TextEditor/TextEditor";
import RatingCard from "../../Components/global/RatingCard/RatingCard";
import RatingPageHeader from "../../Components/global/RatingPageHeader/RatingPageHeader";

function RatingPage() {
    return(
        <>
        <RatingPageHeader/>
        <TextEditor/>
        <RatingCard/>
        </>
    )
}

export default RatingPage