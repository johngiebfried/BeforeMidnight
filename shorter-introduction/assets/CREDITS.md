# Image credits (final folder)

Every file in `assets/` came from Wikimedia Commons on 14 Nov 2026 and was resized to at most 1600 px wide. The page shows photographs in grayscale. Filenames are local; the link is the Commons file page.

| File | What it is | Author / source | License | Commons page |
|---|---|---|---|---|
| balfour_letter_1917.jpg | The Balfour Declaration, 2 Nov 1917 | UK Government, signed by Arthur Balfour | Public domain | https://commons.wikimedia.org/wiki/File:Balfour_declaration_unmarked.jpg |
| stamp_1927.jpg | Palestine Mandate 4-mil stamp, 1927 | Design by Fred Taylor for the UK Government | Public domain | https://commons.wikimedia.org/wiki/File:Palestine_Mandate_Stamp_92.jpg |
| pound_1939.jpg | One Palestine pound, 1939 | Palestine Currency Board; scan by cgb | Public domain | https://commons.wikimedia.org/wiki/File:1_pound_de_Palestine,_1939.jpg |
| jaffa_gate_1920.jpg | British soldiers with machine guns at the Jaffa Gate, 8 Apr 1920 | American Colony (Jerusalem) Photo Dept., Library of Congress | Public domain | https://commons.wikimedia.org/wiki/File:British_soldiers_with_machine_guns_posted_at_Jaffa_Gate._1920._matpc.04717.jpg |
| david_street_1920.jpg | David Street inside the Jaffa Gate, Jerusalem, c. 1920 | Matson Collection, Library of Congress | Public domain | https://commons.wikimedia.org/wiki/File:Jerusalem._The_Old_City._David_Street._The_large_stores_inside_Jaffa_Gate_LOC_matpc.15155.jpg |
| troops_1936.jpg | British troops parading inside the Jaffa Gate during the 1936 disturbances | Matson Collection, Library of Congress | Public domain | https://commons.wikimedia.org/wiki/File:Palestine_disturbances_1936._British_troops_parading_Jerusalem_street,_taken_inside_Jaffa_Gate_LOC_matpc.18167.jpg |
| exodus_haifa_1947.jpg | The Exodus 1947 at Haifa, July 1947 | Hans Pinn, via PikiWiki Israel | Public domain | https://commons.wikimedia.org/wiki/File:114625_haifa_exodus_PikiWiki_Israel.jpg |
| king_david_1946.jpg | King David Hotel after the bombing, 22 July 1946 | Gordon Trevor Moore | CC BY-SA 4.0 (credit required) | https://commons.wikimedia.org/wiki/File:Aftermath_Bombing_King_David_Hotel_1946-07-22_001.jpg |
| un_partition_1947.jpg | The UN plan of partition on United Nations Map No. 103.1(b), February 1956 | United Nations (A/RES/181(II)); Commons upload by Zero0000 | Public domain | https://commons.wikimedia.org/wiki/File:UN_Palestine_Partition_Versions_1947.jpg |

## Not used

- `coin_2mils_1927.jpg` and `dizengoff_house.jpg` (a modern construction hoarding behind the house; wrong period) and `convoy_1948.jpg` (shows a body) are on John's disk in `~/Downloads/Before Midnight Intro/assets/` and `assets/_unused/`. Do not publish the convoy photo.

## Still wanted

Searched Commons and found nothing usable: Tel Aviv crowds on 29 Nov 1947; the British leaving Haifa in 1948; a Jewish displaced-persons camp, 1945 to 1947. For the outro: `19480516 PalestinePost Israel is born.jpg` is on Commons (public domain). It stays out of the intro because it prints the name.

## How the downloads were done

Neither shell can reach wikimedia.org. In the browser, on any commons.wikimedia.org page, a script calls the Commons API for the file's thumbnail URL, fetches it as a blob, and clicks a temporary download link. Files land in ~/Downloads with a `bm_` prefix and are then moved here. Leave about three seconds between files or the browser drops some.
