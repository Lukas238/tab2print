## All chords

```
A    A11    A13    A5    A6    A7    A7sus2    A7sus4    A9    Aadd9    Aaug    Aaug7    Ab    Ab11    Ab13    Ab5    Ab6    Ab7    Ab7sus2    Ab7sus4    Ab9    Abadd9    Abaug    Abaug7    Abdim    Abdim7    Abm    Abm11    Abm13    Abm6    Abm7    Abm7b5    Abm9    Abmaj7    Abmaj9    AbmMaj7    Absus2    Absus4    Adim    Adim7    Am    Am11    Am13    Am6    Am7    Am7b5    Am9    Amaj7    Amaj9    AmMaj7    Asus2    Asus4    B    B11    B13    B5    B6    B7    B7sus2    B7sus4    B9    Badd9    Baug    Baug7    Bb    Bb11    Bb13    Bb5    Bb6    Bb7    Bb7sus2    Bb7sus4    Bb9    Bbadd9    Bbaug    Bbaug7    Bbdim    Bbdim7    Bbm    Bbm11    Bbm13    Bbm6    Bbm7    Bbm7b5    Bbm9    Bbmaj7    Bbmaj9    BbmMaj7    Bbsus2    Bbsus4    Bdim    Bdim7    Bm    Bm11    Bm13    Bm6    Bm7    Bm7b5    Bm9    Bmaj7    Bmaj9    BmMaj7    Bsus2    Bsus4    C    C11    C13    C5    C6    C7    C7sus2    C7sus4    C9    Cadd9    Caug    Caug7    Cdim    Cdim7    A    Ab    B    Bb    C    D    Db    E    Eb    F    G    Gb    Cm    Cm11    Cm13    Cm6    Cm7    Cm7b5    Cm9    Cmaj7    Cmaj9    CmMaj7    Csus2    Csus4    D    D11    D13    D5    D6    D7    D7sus2    D7sus4    D9    Dadd9    Daug    Daug7    Db    Db11    Db13    Db5    Db6    Db7    Db7sus2    Db7sus4    Db9    Dbadd9    Dbaug    Dbaug7    Dbdim    Dbdim7    Dbm    Dbm11    Dbm13    Dbm6    Dbm7    Dbm7b5    Dbm9    Dbmaj7    Dbmaj9    DbmMaj7    Dbsus2    Dbsus4    Ddim    Ddim7    Dm    Dm11    Dm13    Dm6    Dm7    Dm7b5    Dm9    Dmaj7    Dmaj9    DmMaj7    Dsus2    Dsus4    E    E11    E13    E5    E6    E7    E7sus2    E7sus4    E9    Eadd9    Eaug    Eaug7    Eb    Eb11    Eb13    Eb5    Eb6    Eb7    Eb7sus2    Eb7sus4    Eb9    Ebadd9    Ebaug    Ebaug7    Ebdim    Ebdim7    Ebm    Ebm11    Ebm13    Ebm6    Ebm7    Ebm7b5    Ebm9    Ebmaj7    Ebmaj9    EbmMaj7    Ebsus2    Ebsus4    Edim    Edim7    Em    Em11    Em13    Em6    Em7    Em7b5    Em9    Emaj7    Emaj9    EmMaj7    Esus2    Esus4    F    F11    F13    F5    F6    F7    F7sus2    F7sus4    F9    Fadd9    Faug    Faug7    Fdim    Fdim7    Fm    Fm11    Fm13    Fm6    Fm7    Fm7b5    Fm9    Fmaj7    Fmaj9    FmMaj7    Fsus2    Fsus4    G    G11    G13    G5    G6    G7    G7sus2    G7sus4    G9    Gadd9    Gaug    Gaug7    Gb    Gb11    Gb13    Gb5    Gb6    Gb7    Gb7sus2    Gb7sus4    Gb9    Gbadd9    Gbaug    Gbaug7    Gbdim    Gbdim7    Gbm    Gbm11    Gbm13    Gbm6    Gbm7    Gbm7b5    Gbm9    Gbmaj7    Gbmaj9    GbmMaj7    Gbsus2    Gbsus4    Gdim    Gdim7    Gm    Gm11    Gm13    Gm6    Gm7    Gm7b5    Gm9    Gmaj7    Gmaj9    GmMaj7    Gsus2    Gsus4
```

## Sample

- Root: A|Bb|B|C|Db|D|Eb|E|F|Gb|G|Ab
- Type: major|m|aug|dim|7|m7|maj7|m7b5|sus2|sus4|7sus4|9|11|13|6|m6|add9|m9|5|dim7|m13|7sus2|mMaj7|m11|maj9


## Single chord regexp

```
/([A-G]b?)((?:#|&)?m?\d?(?:ajor|aug|dim|aj|sus|add|Maj)?\d{0,2}b?\d?)/gi
```




var str = "AmMaj7";
var reg = /([A-G]b?)((?:#|&)?m?\d?(?:ajor|aug|dim|aj|sus|add|Maj)?\d{0,2}b?\d?)/gi;
var chord_parts = str.match(reg);
console.log( chord_parts[1], chord_parts[2]);