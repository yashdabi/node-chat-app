const expect = require('expect');
const {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', ()=>{
    it('should message generate correct object', ()=>{
        var from, text; from = 'yash'; text = 'my text';
        var m = generateMessage(from, text);
        expect(m.from).toBe(from);
        expect(m.text).toBe(text);
    });
});


describe('generateLocationMessage', ()=>{
    it('should generate location send currect url', ()=>{
        var  from ,lat, lng, url; from = 'Admin'; lat = 1; lng = 2; url = `https://www.google.com/maps?q=${lat},${lng}`;
        var m  = generateLocationMessage(from, lat, lng);
        expect(m.from).toBe(from);
        expect(m.url).toBe(url);
    })
})