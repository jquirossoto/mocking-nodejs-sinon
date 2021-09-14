const { expect } = require('chai');
const sinon = require('sinon');
const fs = require('fs');
const proxyquire = require('proxyquire');

describe('File Management Mock', () => {

    afterEach(() => {
        sinon.restore();
    });

    it('Should call writeFileSync',  () => {
        const writeMock = sinon.mock(fs);
        writeMock.expects('writeFileSync').once();
        const fileManagement = proxyquire('./file.management', { fs });
        fileManagement.createFile('test.txt');
        writeMock.verify();
    });


    it('Should create a new file with a number appended',  () => {
        const writeMock = sinon.mock(fs);
        writeMock.expects('writeFileSync').withArgs('./data/test.txt').throws();
        writeMock.expects('readdirSync').returns(['test.txt']).once();
        writeMock.expects('writeFileSync').withArgs('./data/test1.txt').once();
        const fileManagement = proxyquire('./file.management', { fs });
        fileManagement.createFileSafe('test.txt');
        writeMock.verify();
    });

    it('Should never call writeFileSync when file is empty', () => {
        const writeMock = sinon.mock(fs);
        writeMock.expects('writeFileSync').never();
        const fileManagement = proxyquire('./file.management', { fs });
        try {
            fileManagement.createFile();
        } catch (error) { }
        writeMock.verify();
    });

});