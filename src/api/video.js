import requestVideo from "../util/requestVideo";


export const getVideo = () => {
    return requestVideo({
        url: 'video?method=show&limit=10&page=1',
    })
}



