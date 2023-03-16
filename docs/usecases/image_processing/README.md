# Use Case: Image Processing Workflows

There are two workflows for image processing described in this article:

1. [Image encoding and resizing](#image-encoding-and-resizing)
2. [Image effects](#image-effects)

These workflows require workers that are part of the [orkesworkers](https://github.com/orkes-io/orkesworkers) GitHub repository (and are running in the Orkes Playground for use).

## [Image Encoding and Resizing](https://github.com/conductor-sdk/conductor-examples/blob/main/image_processing/image_multiple_convert_resize.json)

| [Run it in Orkes Playground](https://play.orkes.io/workflowDef/image_multiple_convert_resize) |
| --------------------------------------------------------------------------------------------- |

| [Sample run on Orkes Playground](https://play.orkes.io/execution/5bf1397e-ebbb-11ec-91f6-06eadc02a96b) |
| ------------------------------------------------------------------------------------------------------ |

The [image_multiple_convert_resize.json](https://github.com/conductor-sdk/conductor-examples/blob/main/image_processing/image_multiple_convert_resize.json) workflow takes the URL of an image and converts it to multiple formats and sizes, hosting the completed images on S3.

The workflow takes in 3 inputs:

- fileLocation: A http location to an image file
- outputFormats: An array of image types (E.g. jpg, png, webp)
- outputSizes: An array of sizes. Each size object has a width and height property

For example:

```json
{
  "maintainAspectRatio": true,
  "fileLocation": "https://static01.nyt.com/images/2022/02/24/sports/24soccerRussia-02/merlin_195120864_4c81c841-1349-43dd-8204-c792708e5570-superJumbo.jpg",
  "outputFormats": ["jpg", "png", "webp"],
  "outputSizes": [
    {
      "width": 1200,
      "height": 800
    },
    {
      "width": 600,
      "height": 400
    },
    {
      "width": 300,
      "height": 200
    }
  ]
}
```

This will result in 9 output images, i.e; 3 different sizes with 3 formats each.

### Visual Representation

<img src="https://raw.githubusercontent.com/conductor-sdk/conductor-examples/main/image_processing/images/resize.jpg"
alt="image resize workflow" width="600" style={{paddingBottom: 20, paddingTop: 10}} />

### Output of the workflow

```json
{
  "fileLocations": {
    "image_convert_resize_png_1200x800_3": {
      "fileLocation": "https://image-processing-orkes.s3.amazonaws.com/1d932e8f-417c-41e6-a001-c2b3c230c43f.png"
    },
    "image_convert_resize_png_600x400_4": {
      "fileLocation": "https://image-processing-orkes.s3.amazonaws.com/a4cde72e-8314-408a-bab7-56a277f32a67.png"
    },
    "image_convert_resize_webp_1200x800_6": {
      "fileLocation": "https://image-processing-orkes.s3.amazonaws.com/839fa6c5-1315-4aad-950a-044356e232d2.webp"
    },
    "image_convert_resize_png_300x200_5": {
      "fileLocation": "https://image-processing-orkes.s3.amazonaws.com/7e2bd2ba-8629-47cc-aa33-69b4192edef1.png"
    },
    "image_convert_resize_jpg_1200x800_0": {
      "fileLocation": "https://image-processing-orkes.s3.amazonaws.com/887490b3-c47a-4b89-abb7-39ec356a2fe2.jpg"
    },
    "image_convert_resize_webp_300x200_8": {
      "fileLocation": "https://image-processing-orkes.s3.amazonaws.com/a34d4f88-e3ea-4252-9486-534861da45ed.webp"
    },
    "image_convert_resize_jpg_300x200_2": {
      "fileLocation": "https://image-processing-orkes.s3.amazonaws.com/5093f7b0-29a2-4ae8-95aa-50908ec1ac32.jpg"
    },
    "image_convert_resize_webp_600x400_7": {
      "fileLocation": "https://image-processing-orkes.s3.amazonaws.com/31dfea0c-b684-450e-9a3a-66bcbde89411.webp"
    },
    "image_convert_resize_jpg_600x400_1": {
      "fileLocation": "https://image-processing-orkes.s3.amazonaws.com/15836483-e3bf-4dad-a852-46afb1748b5f.jpg"
    }
  }
}
```

## [Image Effects](https://github.com/conductor-sdk/conductor-examples/blob/main/image_processing/image_effects.json)

The [image_effects.json](https://github.com/conductor-sdk/conductor-examples/blob/main/image_processing/image_effects.json) workflow demonstrates how to add effects to images. The following recipes are currently supported:

- Applying sepia tone
- Making an image more vibrant
- Adding a watermark proportional to the size of an image

### Workflow Inputs

The workflow takes in 3 inputs:

- fileLocation: A http location to an image file
- recipe: Supported recipes are sepia, vibrant and watermark
- recipeParameters: A json object of key value pairs that are specific to the recipe. The list of recipe parameters for each recipe

sepia

| key                     | Value type         | description                                                                                                                                                                                                                                                              |
| ----------------------- | ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| sepiaIntensityThreshold | Integer (E.g. 80 ) | Applies a special effect to the image, similar to the effect achieved in a photo darkroom by sepia toning. Threshold ranges from 0 to QuantumRange and is a measure of the extent of the sepia toning. A threshold of 80 is a good starting point for a reasonable tone. |

vibrant

| key      | Value type        | description                                                                                       |
| -------- | ----------------- | ------------------------------------------------------------------------------------------------- |
| vibrance | Integer (E.g. 4 ) | Positive values make the image more vibrant, whereas negative values make the image less vibrant. |

watermark

| key                   | Value type             | description                                                                                                                                              |
| --------------------- | ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| watermarkFileLocation | String (url)           | A logo file that will be applied as a watermark on top of the file that is specified by the fileLocation parameter.                                      |
| gravity               | String (E.g southeast) | Specifies the location to apply the logo/watermark image. Allowed values: NorthWest, North, NorthEast, West, Center, East, SouthWest, South & SouthEast. |

### Workflow Diagram

<img src="https://raw.githubusercontent.com/conductor-sdk/conductor-examples/main/image_processing/images/image_effects_diagram.jpg"
alt="Diagram of Workflow" width="400" style={{paddingBottom: 20, paddingTop: 10}} />

### Example Input

```json
{
  "fileLocations": [
    "https://static01.nyt.com/images/2022/02/24/sports/24soccerRussia-02/merlin_195120864_4c81c841-1349-43dd-8204-c792708e5570-superJumbo.jpg"
  ],
  "recipeInfos": [
    {
      "recipe": "sepia",
      "recipeParameters": {
        "sepiaIntensityThreshold": 80
      }
    },
    {
      "recipe": "vibrant",
      "recipeParameters": {
        "vibrance": 4
      }
    },
    {
      "recipe": "watermark",
      "recipeParameters": {
        "watermarkFileLocation": "https://orkes.io/logo/orkes/png/4X/orkes-logo-purple-inverted-4x.png",
        "gravity": "southwest"
      }
    }
  ]
}
```

### Example Output

```json
{
  "fileLocations": {
    "image_effect_merlin_195120864_4c81c841-1349-43dd-8204-c792708e5570-superJumbo.jpg_sepia_0": {
      "fileLocation": "https://image-processing-orkes.s3.amazonaws.com/e52e3ef6-956d-4b5c-9a7c-17ffa64645d2-SEPIA.jpg",
      "recipe": "SEPIA",
      "recipeParameters": {
        "sepiaIntensityThreshold": 80
      }
    },
    "image_effect_merlin_195120864_4c81c841-1349-43dd-8204-c792708e5570-superJumbo.jpg_vibrant_1": {
      "fileLocation": "https://image-processing-orkes.s3.amazonaws.com/333ca485-6482-4e64-8547-4828289904d9-VIBRANT.jpg",
      "recipe": "VIBRANT",
      "recipeParameters": {
        "vibrance": 4
      }
    },
    "image_effect_merlin_195120864_4c81c841-1349-43dd-8204-c792708e5570-superJumbo.jpg_watermark_2": {
      "fileLocation": "https://image-processing-orkes.s3.amazonaws.com/c065e32a-bc8d-448f-9d07-73b7373478a3-WATERMARK.jpg",
      "recipe": "WATERMARK",
      "recipeParameters": {
        "watermarkFileLocation": "https://orkes.io/logo/orkes/png/4X/orkes-logo-purple-inverted-4x.png",
        "gravity": "southwest"
      }
    }
  }
}
```

### Images from the workflow

Original image

<img src="https://raw.githubusercontent.com/conductor-sdk/conductor-examples/main/image_processing/images/source_image.jpeg"
alt="original image" width="600" style={{paddingBottom: 20}} />

Image on applying sepia recipe

<img src="https://raw.githubusercontent.com/conductor-sdk/conductor-examples/main/image_processing/images/sepia_tone.jpeg"
alt="sepia result" width="600" style={{paddingBottom: 20}} />

Image on apllying vibrant recipe

<img src="https://raw.githubusercontent.com/conductor-sdk/conductor-examples/main/image_processing/images/vibrant_effect.jpeg"
alt="vibrant image" width="600" style={{paddingBottom: 20}} />

Image on applying watermark recipe (Logo gets added as per the gravity key mentioned in the input)

<img src="https://raw.githubusercontent.com/conductor-sdk/conductor-examples/main/image_processing/images/watermark_effect.jpeg"
alt="watermarked image" width="600" style={{paddingBottom: 20}} />
