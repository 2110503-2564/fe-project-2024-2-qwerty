'use client'
import { useReducer } from "react";
import Card from "./Card";
import Link from "next/link";

export default function CardPanel() {
      let defaultVenue = new Map<string,number>([
            ["The Bloom Pavilion", 0],
            ["Spark Space", 0],
            ["The Grand Table", 0]
      ]);
      const ratingReducer = (venueList:Map<string, number>, action: {type: string, venueName: string, rating?: number}) => {
            switch(action.type){
                  case 'add': {
                        const newVenueList = new Map(venueList);
                        newVenueList.set(action.venueName, action.rating??0);
                        return newVenueList;
                  }
                  case 'remove': {
                        const newVenueList = new Map(venueList);
                        newVenueList.delete(action.venueName);
                        return newVenueList;
                  }
                  default: {
                        let defaultVenue = new Map<string,number>([
                              ["The Bloom Pavilion", 0],
                              ["Spark Space", 0],
                              ["The Grand Table", 0]
                        ]);
                        return defaultVenue;
                  }
            }
      };
      const [venueList, dispatchVenue] = useReducer(ratingReducer, defaultVenue);

      const mockVenueRepo = [
            {vid: "001", name: "The Bloom Pavilion", image: "/img/bloom.jpg"},
            {vid: "002", name: "Spark Space", image: "/img/sparkspace.jpg"},
            {vid: "003", name: "The Grand Table", image: "/img/grandtable.jpg"}
      ]
      
      return (
            <div className="w-full text-center">
            <div style = {{margin: "20px", display: "flex", flexDirection: "row", alignContent: "space-around", justifyContent: "space-around", flexWrap: "wrap"}}>
                  {mockVenueRepo.map((venue) => (
                        <Link key = {venue.vid} href = {`/venue/${venue.vid}`} className="w-1/5">
                              <Card venueName={venue.name} imgSrc={venue.image} onRate={(venueName:string, rating:number) => dispatchVenue({type: 'add', venueName: venueName, rating: rating})}></Card>
                        </Link>
                  ))}
            </div>
            <div className="w-full text-xl font-medium">Venue List with Rating {venueList.size}</div>
            {Array.from(venueList).map(([venueName, rating]) => (<div key = {venueName} data-testid = {venueName} onClick={() => dispatchVenue({type: 'remove', venueName: venueName})}>
                  {venueName} : {rating}
            </div>))}
            </div>
      );
}