import React from "react";
import "./biography_module.scss";

class BiographyModule extends React.Component {

    setGridData = () => {
        let content = [
            {
                id: 1,
                isImage: true,
                imagePath: './assets/gallery1-1-480x480.jpg'
            },
            {
                id: 2,
                isImage: false,
                textContent: [
                    '2014 Intercoiffure New York',
                    'Icon of Color',
                    '2011 NAHA',
                    'Master Hairstylist of the Year - Winner',
                    '2011 NAHA',
                    'Avant Garde - Finalist'
                ]
            },
            {
                id: 3,
                isImage: true,
                imagePath: './assets/mentorship2-480x480.jpg'
            },
            {
                id: 4,
                isImage: false,
                textContent: [
                    '2008 Featured on documentary series',
                    '‘I’m NOT just a hairdresser’',
                    '2006 NAHA',
                    'Master Hairstylist of the Year – Nominee',
                    '2006 Canadian Hairdresser Mirror Awards',
                    'International Stylist – Nominee'
                ]
            },
            {
                id: 5,
                isImage: false,
                textContent: [
                    '2005 Canadian Hairdresser Mirror Awards',
                    'International Stylist – Winner',
                    '2005 NAHA',
                    'Master Hairstylist of the Year – Nominee'
                ]
            },
            {
                id: 6,
                isImage: true,
                imagePath: './assets/kris5-480x480.jpg'
            },
            {
                id: 7,
                isImage: false,
                textContent: [
                    '2004 Canadian Hairdresser Mirror Awards',
                    'International Stylist – Winner',
                    '2004 NAHA',
                    'Master Hairstylist of the Year – Nominee',
                    '2003 Canadian Hairdresser Mirror Awards',
                    'International Stylist – Nominee'
                ]
            },
            {
                id: 8,
                isImage: true,
                imagePath: './assets/krissorbie3-480x480.jpg'
            },
            {
                id: 9,
                isImage: true,
                imagePath: './assets/kris3-480x480.jpg'
            },
            {
                id: 10,
                isImage: false,
                textContent: [
                    '2003 NAHA',
                    'Master Hairstylist of the Year – Nominee',
                    '2002 NAHA',
                    'Master Hairstylist of the Year – Winner',
                    '2002 ABBIES',
                    'Best Salon Educational Program – Winner'
                ]
            },
            {
                id: 11,
                isImage: true,
                imagePath: './assets/kris2-480x480.jpg'
            },
            {
                id: 12,
                isImage: false,
                textContent: [
                    '2001 NAHA',
                    'Master Hairstylist of the Year – Nominee',
                    '2000 HairColor USA',
                    'Most Inspirational Educator – Winner',
                    '1998 HairColor USA',
                    'Best Educator of the Year – Winner'
                ]
            },
            {
                id: 13,
                isImage: true,
                imagePath: './assets/kris6-480x480.jpg'
            },
            {
                id: 14,
                isImage: true,
                imagePath: './assets/kris4-480x480.jpg'
            },
            {
                id: 15,
                isImage: false,
                textContent: [
                    'Board Member for NAHA (North American Hairstylist Awards)',
                    'Judge for NAHA (North American Hairstylist Awards)',
                    'Judge for Dutch Hairdressing Awards',
                    'Most Inspirational Educator – Winner',
                    'Judge for Belgian Hairdressing Awards',
                    'Judge for Australian Hairdressing Awards'
                ]
            },
            {
                id: 14,
                isImage: true,
                imagePath: './assets/krismentorhour-480x480.jpg'
            }
        ];
        return content;
    }

    buildTextModule = (text) => {
        return (
            <div className="module-text">
                <div className="text-wrapper">
                    {text.map( (item) => {
                        return( <p>{item}</p> );
                    })}
                </div>
            </div>
        );
    }

    buildImageModule = (path) => {
        let moduleBackground = {
            backgroundImage: 'url(' + path + ')',
            height: '461px'
        };
        return (
            <div className="module-image" style={moduleBackground}>
                <img src={require('./assets/krismentorhour-480x480.jpg')} />
            </div>
        );
    }

    render() {
        let contentString = this.setGridData();
        return(
            <div>
                {
                    contentString.map( (item) => {
                        if( item.isImage )
                            return( this.buildImageModule(item.imagePath) );
                        return(this.buildTextModule(item.textContent));
                    })
                }
            </div>
        );
    }
}

export default BiographyModule;