// Define qual é o formato dos dados que são necessários para se criar um appoinment.

export default interface ICreateAppointmentDTO {

    provider_id: string;
    user_id: string;
    date: Date;

}
