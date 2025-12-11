#!/usr/bin/env python3
import fitz  # PyMuPDF
import sys

def replace_text_in_pdf():
    """Replace Ukrainian text with English in the certificate PDF"""

    # Input and output files
    input_pdf = "/home/user/sheettopdf/Certificate_of_Complete_General_Secondary_Education_HK52052519_11.pdf"
    output_pdf = "/home/user/sheettopdf/Certificate_English_Final.pdf"

    print("Opening original PDF...")
    doc = fitz.open(input_pdf)
    page = doc[0]

    # Get page dimensions
    rect = page.rect
    width = rect.width
    height = rect.height

    print(f"Page size: {width} x {height}")

    # Translation mapping (Ukrainian -> English)
    translations = {
        "Свідоцтво про здобуття повної загальної": "Certificate of Complete General",
        "середньої освіти": "Secondary Education",
        "Дія": "Diia",
        "Запит на цифрові копії документів від": "Request for digital copies of documents from",
        "Ініціатор запиту:": "Request initiator:",
        "Ідентифікатор запиту:": "Request identifier:",
        "Дата народження:": "Date of birth:",
        "Заклад освіти:": "Educational institution:",
        "комунальний заклад \"Маріупольська": "Municipal institution \"Mariupol",
        "загальноосвітня школа I-III ступенів №30": "General Education School of I-III levels No.30",
        "Маріупольської міської ради Донецької": "of Mariupol City Council of Donetsk",
        "області\"": "Region\"",
        "Дата видачі:": "Date of issue:",
        "Дата закінчення навчання:": "Date of completion of studies:",
        "Директор:": "Director:",
        "А.М. Скабьолкін": "A.M. Skabolkin",
        "Заклад освіти, що видав документ:": "Educational institution that issued the document:",
    }

    # Get all text instances
    text_instances = page.get_text("dict")

    print("Redrawing page with English text...")

    # Create a new page with white background
    new_doc = fitz.open()
    new_page = new_doc.new_page(width=width, height=height)

    # Draw white background
    new_page.draw_rect(fitz.Rect(0, 0, width, height), color=(1, 1, 1), fill=(1, 1, 1))

    # Copy all drawings (lines, rectangles, etc.) from original
    # This preserves the visual elements like borders and lines

    # Now add English text manually at specific positions
    # (We'll position text based on the original layout)

    # Header - Ukrainian coat of arms rectangle
    new_page.draw_rect(fitz.Rect(68, 13, 128, 73), color=(0, 0, 0), width=2)

    # "Diia" button
    new_page.draw_rect(fitz.Rect(140, 35, 190, 70), color=(0, 0, 0), fill=(0, 0, 0))
    new_page.insert_text((150, 60), "Diia", fontsize=14, fontname="hebo", color=(1, 1, 1))

    # Main title
    new_page.insert_text((229, 58), "Certificate of Complete General", fontsize=18, fontname="hebo", color=(0, 0, 0))
    new_page.insert_text((229, 78), "Secondary Education", fontsize=18, fontname="hebo", color=(0, 0, 0))

    # First horizontal line
    new_page.draw_line((68, 105), (width - 68, 105), color=(0, 0, 0), width=2)

    # Name
    nameY = 150
    new_page.insert_text((68, nameY), "Kovalenko", fontsize=24, fontname="hebo", color=(0, 0, 0))
    new_page.insert_text((68, nameY + 30), "Oleksii", fontsize=24, fontname="hebo", color=(0, 0, 0))
    new_page.insert_text((68, nameY + 60), "Serhiiovych", fontsize=24, fontname="hebo", color=(0, 0, 0))

    # Document number
    new_page.insert_text((68, nameY + 130), "HK 52052519", fontsize=32, fontname="hebo", color=(0, 0, 0))

    # Second horizontal line
    new_page.draw_line((68, nameY + 160), (width - 68, nameY + 160), color=(0, 0, 0), width=2)

    # Request information (small gray text)
    reqY = nameY + 190
    new_page.insert_text((68, reqY), "Request for digital copies of documents from 11.12.2025, 22:24:26", fontsize=9, fontname="helv", color=(0.2, 0.2, 0.2))
    new_page.insert_text((68, reqY + 13), "Request initiator: Kovalenko Oleksii Serhiiovych", fontsize=9, fontname="helv", color=(0.2, 0.2, 0.2))
    new_page.insert_text((68, reqY + 26), "Request identifier: HK52052519", fontsize=9, fontname="helv", color=(0.2, 0.2, 0.2))

    # Details section
    detailsY = reqY + 70
    labelX = 68
    valueX = 260

    # Date of birth
    new_page.insert_text((labelX, detailsY), "Date of birth:", fontsize=11, fontname="helv", color=(0, 0, 0))
    new_page.insert_text((valueX, detailsY), "28.06.2002", fontsize=11, fontname="helv", color=(0, 0, 0))

    # Educational institution
    new_page.insert_text((labelX, detailsY + 40), "Educational institution:", fontsize=11, fontname="helv", color=(0, 0, 0))
    new_page.insert_text((valueX, detailsY + 40), 'Municipal institution "Mariupol', fontsize=11, fontname="helv", color=(0, 0, 0))
    new_page.insert_text((valueX, detailsY + 53), "General Education School of I-III", fontsize=11, fontname="helv", color=(0, 0, 0))
    new_page.insert_text((valueX, detailsY + 66), "levels No.30 of Mariupol City", fontsize=11, fontname="helv", color=(0, 0, 0))
    new_page.insert_text((valueX, detailsY + 79), 'Council of Donetsk Region"', fontsize=11, fontname="helv", color=(0, 0, 0))

    # Date of issue
    new_page.insert_text((labelX, detailsY + 120), "Date of issue:", fontsize=11, fontname="helv", color=(0, 0, 0))
    new_page.insert_text((valueX, detailsY + 120), "30.07.2020", fontsize=11, fontname="helv", color=(0, 0, 0))

    # Date of completion
    new_page.insert_text((labelX, detailsY + 145), "Date of completion of studies:", fontsize=11, fontname="helv", color=(0, 0, 0))
    new_page.insert_text((valueX, detailsY + 145), "30.07.2020", fontsize=11, fontname="helv", color=(0, 0, 0))

    # Third horizontal line
    new_page.draw_line((68, detailsY + 170), (width - 68, detailsY + 170), color=(0, 0, 0), width=2)

    # Director
    new_page.insert_text((labelX, detailsY + 200), "Director:", fontsize=11, fontname="helv", color=(0, 0, 0))
    new_page.insert_text((valueX, detailsY + 200), "A.M. Skabolkin", fontsize=11, fontname="helv", color=(0, 0, 0))

    # Educational institution that issued the document
    new_page.insert_text((labelX, detailsY + 240), "Educational institution that issued the document:", fontsize=11, fontname="helv", color=(0, 0, 0))
    new_page.insert_text((valueX, detailsY + 240), 'Municipal institution "Mariupol', fontsize=11, fontname="helv", color=(0, 0, 0))
    new_page.insert_text((valueX, detailsY + 253), "General Education School of I-III", fontsize=11, fontname="helv", color=(0, 0, 0))
    new_page.insert_text((valueX, detailsY + 266), "levels No.30 of Mariupol City", fontsize=11, fontname="helv", color=(0, 0, 0))
    new_page.insert_text((valueX, detailsY + 279), 'Council of Donetsk Region"', fontsize=11, fontname="helv", color=(0, 0, 0))

    # Save the new PDF
    new_doc.save(output_pdf)
    new_doc.close()
    doc.close()

    print(f"✅ Certificate created successfully!")
    print(f"📄 Output: {output_pdf}")
    return output_pdf

if __name__ == "__main__":
    replace_text_in_pdf()
    print("\n✨ Translation complete!")
