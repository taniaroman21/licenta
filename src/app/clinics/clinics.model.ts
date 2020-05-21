import { City, County } from '../shared/models/location.model';

export interface ClinicListItem{
    name: string,
    email: string,
    city: City,
    county: County,
    profileImage: string | null,
    fields: MedicineFileds[]
    reviews: ReviewAverage
    
}
export interface ClientProfile{

}

export interface MedicineFileds{
    id: string,
    name: string,
}

export interface Medic{
    name: string,
    email: string,
}

export interface Review{
    stars: number,
    description: string
}
export interface ReviewAverage{
    stars: number,
    totalRewies: number
}