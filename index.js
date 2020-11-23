import http from 'http';
import crypto from 'crypto';
import express from 'express';
import bodyParser from 'body-parser';
import { createReadStream } from 'fs';
import appSrc from './app.js';

const PORT = process.env.PORT || 8080;

const app = appSrc(express, bodyParser, createReadStream, crypto, http);

app.listen(PORT);
