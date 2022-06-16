import * as Yup from 'yup';

export const showFiels = {
    slug:"",
    title:"",
    venue:"",
    excerpt:"",
    content:"",
    yt:"",
    image:"na.jpg",
    date:"",
    time:""
}

export const showValidation = Yup.object({
    slug:Yup.string()
    .required('Sorry the slug is required'),
    title:Yup.string()
    .required('Sorry the title is required')
    .max(50,'You can only do 30 char'),
    venue:Yup.string()
    .required('Sorry the venue is required'),
    excerpt:Yup.string()
    .required('Sorry the excerpt is required'),
    content:Yup.string()
    .required('Sorry the content is required'),
    yt:Yup.string()
    .required('Sorry the YT is required'),
    date:Yup.string()
    .required('Sorry the date is required'),
    time:Yup.string()
    .required('Sorry the time is required'),
})