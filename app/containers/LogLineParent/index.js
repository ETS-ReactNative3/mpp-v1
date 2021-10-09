import React from "react";
import Logline from "../Logline";
import {useParams} from "react-router-dom";

export default function LogLineParent(){
    const params = useParams();
    console.log(params);
    return(
        <Logline />
    )
}