export class customerDocument{
    customerDocumentId ?:number;
    photocopyOfLalpurjaDoc:string;
    PhotocopyOfLalpurjaCode ?:string;
    taxClearanceDoc:string;
    taxClearanceCode ?:string;
    citizenshipDoc:string;
    CitizenshipCode ?:string;
    naapiNaksaWithKittaNoDoc:string;
    naapiNaksaWithKittaNo ?:string;
    houseDesginMapDoc:string;
    houseDesginMapCode ?:string;
    issueTemporayCertification:boolean;
    permamentCertification:boolean;
    completionCertification:boolean;
    approvalOfWardChair:boolean;
    approvalOfWardChairLackOfAccessOfRoad:boolean;
    customerId:number;
    //filesource:File;
    photoCopyOfLalpurjaFile ?:File;
    taxClearanceFile ?:File;
    citizenshipDocFile ?:File;
    naapiNaskaDocFile ?:File;
    houseDesignMapDocFile ?:File;
    actionType ?:string;
}